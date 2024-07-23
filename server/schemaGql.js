import { gql } from "apollo-server-express";
// creating schema
const typeDefs = gql`
    type Query{
        users:[User]
        user(_id:ID!):User
        quots:[QuoteWithName]
        quote(by:ID!):[Quote]
        myprofile:User
    }
    type User{
        _id:ID
        firstName:String!
        lastName:String!
        email:String!
        quotes:[Quote]
    }
    type Quote{
        name:String
        by:ID
    }
    
    type QuoteWithName{
        name:String
        by:IdWithName
    }
    
    type IdWithName{
        _id:ID,
        firstName:String
    }
    
    type Token{
        token:String
    }
    
    type Mutation{
        signupUser(signupInput:SignUpInput):User
        signinUser(userSignin:SignInInput!):Token
        createQuote(name:String!):String
    }
    
    input SignUpInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
    input SignInInput{
        email:String!
        password:String!
    }
`

export default typeDefs