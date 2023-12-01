import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Navbar } from "./components/navbar.jsx";
import { Blog } from "./pages/Blog.jsx";
import { BlogForm } from "./pages/BlogForm.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { AuthProvider } from './context/AuthContext.jsx'; 
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { BlogDetails } from "./pages/BlogDetails.jsx";
import { BlogManager } from "./pages/BlogManager.jsx";
import { BlogEdit } from "./pages/BlogEdit.jsx";
import * as authService from './auth/authService.js';

const Main = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
  }, [location.pathname]);


  return (
    <div>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar username={user ? user.username : ""} userImageUrl="/imgs/5.png" />
      )}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
        <Route path="/blogs/:blogId" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
        <Route path="/blog-manager" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
        <Route path="/blogedit/:blogId" element={<ProtectedRoute><BlogEdit /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  );
};