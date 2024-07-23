import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
    mutation createUser($signupInput:SignUpInput!){
        user:signupUser(signupInput:$signupInput){
        _id,
        firstName,
        lastName,
        email
    }
}
`

export const LOGIN_USER = gql`
    mutation signInUser($userSignin:SignInInput!){
        user:signinUser(userSignin:$userSignin){
            token
        }
}
`

export const CREATE_QUOTE = gql`
    mutation createQuote($name:String!){
        quote:createQuote(name:$name)
    }
`