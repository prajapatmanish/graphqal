import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: "#ba68c8",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} GraphQl Learning. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
