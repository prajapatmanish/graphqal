import { Alert, Box, Button, Container, Input, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../gqlQueries/mutation';

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted(data) {
            login();
            localStorage.setItem("token", data.user.token)
            navigate('/');
        }
    })
    const { login } = useAuth();
    const navigate = useNavigate();


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
        console.log(formData)
        loginUser({
            variables: {
                userSignin: formData
            }
        })
    }, [formData, loginUser])

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
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
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
