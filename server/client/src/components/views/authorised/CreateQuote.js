import React, { useState } from 'react';
import { Button, Box, Container, Typography, Paper, Input, Alert } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../../../gqlQueries/mutation';
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../../../gqlQueries/queries';


const CreateQuote = () => {
    const [quote, setQuote] = useState('');
    const { isLoggedIn } = useAuth();
    const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE,{
        refetchQueries:[
            GET_ALL_QUOTES,
            GET_MY_PROFILE
        ]
    })

    const handleQuoteChange = (e) => {
        setQuote(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuote({
            variables: {
                name: quote
            }
        })
        console.log('Submitted Quote:', quote);
        setQuote(''); // Clear the text field after submission
    };

    if (!isLoggedIn) {
        return <Typography variant="h6">You need to log in to submit a quote.</Typography>;
    }

    if (error) console.log(error.message)

    if (loading) return <h1>Loading...</h1>

    return (
        <Container maxWidth="sm" >
            <Paper elevation={3} sx={{ p: 3, mt: 15 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error.message}
                        </Alert>
                    )}
                    {data && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {data.quote}
                        </Alert>
                    )}
                    <Typography variant="h5" component="h1">
                        Create a Quote
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
                        <Input
                            fullWidth
                            type='text'
                            required
                            name='quote'
                            placeholder='Email'
                            value={quote}
                            onChange={handleQuoteChange}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateQuote;
