import { useMutation } from '@apollo/client';
import { Alert, Box, Button, Container, Input, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { SIGNUP_USER } from '../../../gqlQueries/mutation';

export default function SignUp() {
    const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);

    const handleChange = useCallback((e) => {
        setFormData((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value
            }
        })
    }, [])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        signUpUser({
            variables:{
                signupInput: formData
            }
        })
        console.log(formData)
    }, [formData, signUpUser])

    if (loading) return <h1>Loading...</h1>

    return (
        <Container className='container'>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="77vh"
            >
                {/* Conditionally render error message */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error.message}
                    </Alert>
                )}
                {data && data.user && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {data.user.firstName} is SignedUp. You can login now!
                    </Alert>
                )}
                <Typography variant="h4" component="h1" gutterBottom>
                    SignUp
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={4} width={"400px"}>
                        <Input
                            fullWidth
                            type='text'
                            required
                            name='firstName'
                            placeholder='First Name'
                            value={formData?.firstName}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mb={4} width={"400px"}>
                        <Input
                            fullWidth
                            type='text'
                            required
                            name='lastName'
                            placeholder='Last Name'
                            value={formData?.lastName}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mb={4} width={"400px"}>
                        <Input
                            fullWidth
                            type='email'
                            required
                            name='email'
                            placeholder='Email'
                            value={formData?.email}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mb={4}>
                        <Input
                            fullWidth
                            type='password'
                            required
                            placeholder='Password'
                            name='password'
                            value={formData?.password}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button type='submit' sx={{ borderColor: "#ba68c8" }} variant='outlined'>submit</Button>
                </form>
            </Box>
        </Container>
    )
}
