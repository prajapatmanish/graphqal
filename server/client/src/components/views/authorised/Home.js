import React from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../../../gqlQueries/queries';
import { Link } from 'react-router-dom';

const Home = () => {

    const { data, loading, error } = useQuery(GET_ALL_QUOTES, {
        fetchPolicy: "cache-and-network"
    })

    if (loading) return <h1>Loading...</h1>

    if (error) console.log(error)

    // api calling example without apollo client
    // useEffect(() => {
    //     fetch("http://localhost:4000", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             query: `
    //             query getAllQuotes{
    //                 quots{
    //                     name
    //                     by{
    //                         _id
    //                         firstName
    //                     }
    //                 }
    //             }
    //         `
    //         })
    //     }).then((res)=>res.json().then((data)=> console.log(data)))
    // }, [])

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Quotes Listing
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <List>
                        {data.quots.map((quote, i) => (
                            <ListItem key={quote.by._id + i}>
                                <ListItemText
                                    primary={`"${quote.name}"`}
                                    secondary={<Link to={`/profile/${quote.by._id}`}>{`~ ${quote.by.firstName}`}</Link>}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default Home;
