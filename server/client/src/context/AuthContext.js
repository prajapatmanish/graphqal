import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token){
        setIsLoggedIn(true);
    }
  },[token])

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
