import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../services/userService"; // Using your new service!
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have this from your Start.js

const LoggedIn = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        await userService.getMe(); 
        
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Session verification failed:", error.message);
        
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false; // Cleanup to prevent state updates if the user navigates away fast
    };
  }, []);

  // 1. While waiting for the backend to respond, show nothing (or a spinner)
  if (isAuthenticated === null) {
    return <LoadingSpinner />; 
  }

  if (isAuthenticated === false) {
    return <Navigate to="/" replace />; 
  }

  return <>{children}</>; 
};

export default LoggedIn;