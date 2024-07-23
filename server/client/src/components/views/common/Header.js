import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#9c27b0' }}>
            <Toolbar>
                <Typography variant="h6" onClick={() => navigate("/")} component="div" sx={{ flexGrow: 1, cursor:"pointer" }}>
                    QuoteWorld
                </Typography>
                <Box>
                    {isLoggedIn ? (
                        <>
                            <Button color="inherit" onClick={() => navigate("/profile")}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={() => navigate("/create-quote")}>
                                Create Quote
                            </Button>
                            <Button color="inherit" onClick={handleLogoutClick}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleLoginClick}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={handleSignUpClick}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
