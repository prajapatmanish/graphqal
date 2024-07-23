import React from 'react';
import { Avatar, Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../../../gqlQueries/queries';

const Profile = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "cache-and-network"
  });
  // const userProfile = {
  //   image: 'https://robohash.org/manish.png?size=150x150', // Replace with actual image URL or import an image
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   quotes: [
  //     { quote: 'The journey of a thousand miles begins with one step.', by: 'Lao Tzu' },
  //     { quote: 'Life is what happens when you’re busy making other plans.', by: 'John Lennon' },
  //     { quote: 'Get busy living or get busy dying.', by: 'Stephen King' },
  //   ],
  // };

  if (loading) return <h1>Loading...</h1>

  if (error) console.log(error)

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar alt={data.user.firstName} src={`https://robohash.org/${data.user.firstName}.png?size=150x150`} sx={{ width: 100, height: 100, border: 1 }} />
          <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
            {data.user.firstName} {data.user.lastName}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            {data.user.email}
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" component="h2">
            Favorite Quotes
          </Typography>
          <List>
            {data.user.quotes.map((quote, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`"${quote.name}"`}
                // secondary={`- ${quote.by}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
