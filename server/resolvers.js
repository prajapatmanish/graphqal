import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");


const resolvers = {
    Query: {
        users: async () => await User.find({}),
        user: async (_, { _id }) => await User.findOne({_id}),
        quots: async () => await Quote.find({}).populate("by", "_id firstName"),
        quote: async (_, { by }) => await Quote.find({by}),
        myprofile: async (_,agrs,{ userId }) => {
            if(!userId) throw new Error("You must be logged in.");
            return await User.findOne({_id:userId})
        }
    },
    User: {
        quotes: async (ur) => await Quote.find({by: ur._id})
    },
    Mutation: {
        signupUser: async (_, { signupInput }) => {
            const userExists = await User.findOne({ email: signupInput.email });
            if (userExists) {
                throw new Error("User already exists with this email")
            }

            const hashedPassword = await bcrypt.hash(signupInput.password, 10);

            const newUser = new User({
                ...signupInput,
                password: hashedPassword
            })
            return await newUser.save();
        },
        signinUser: async (_, { userSignin }) => {
            const userExists = await User.findOne({ email: userSignin.email });
            if (!userExists) {
                throw new Error("User dosen't exists with this email")
            }
            const doMatch = await bcrypt.compare(userSignin.password, userExists.password);
            if (!doMatch) {
                throw new Error("Invalid email or password.")
            }
            const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET)
            return { token }
        },
        createQuote: async (_, { name }, { userId }) => { // first argument is parent, second argument is input got from frontend, third argument is context
            if (!userId) throw new Error("You must be logged in.")
            const newQuote = new Quote({
                name,
                by: userId
            })
            await newQuote.save();
            return "Quote created successfully!"
        }
    }
}

export default resolvers
