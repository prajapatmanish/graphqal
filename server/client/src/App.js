import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';
import Header from './components/views/common/Header';
import Login from './components/views/unauthorised/Login';
import SignUp from './components/views/unauthorised/Signup';
import Footer from './components/views/common/Footer';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/views/authorised/Profile';
import CreateQuote from './components/views/authorised/CreateQuote';
import Home from './components/views/authorised/Home';
import PublicRoute from './routes.js/publicRoutes';
import ProtectedRoute from './routes.js/protectedRoutes';
import OtherProfile from './components/views/authorised/OtherProfile';
import NotFound from './components/views/common/NotFound';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <Box sx={{ flex: '1' }}>
            <Routes>
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/create-quote" element={<ProtectedRoute element={<CreateQuote />} />} />
              <Route path="/" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/profile/:userid" element={<ProtectedRoute element={<OtherProfile />} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;

