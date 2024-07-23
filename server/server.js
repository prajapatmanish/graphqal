import { ApolloServer } from "apollo-server-express";
import { 
    ApolloServerPluginLandingPageGraphQLPlayground, 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
 } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import http from 'http'
import path from "path";

const __dirname = path.resolve();
const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if(process.env.NODE_ENV !== "production") dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("connected to database")
})
mongoose.connection.on("error", (err) => {
    console.log("connection errr", err)
})
import './models/Quotes.js'
import './models/User.js'

import resolvers from "./resolvers.js";

// middlware 
const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        process.env.NODE_ENV !== "production" ?
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

await server.start();
server.applyMiddleware({
    app,
    path:'/graphql' // default path of graphql if we don't pass it path will be same
})

httpServer.listen({port},()=>{
    console.log(`Server ready at ${server.graphqlPath}`)
})
