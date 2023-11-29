import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Navbar } from "./components/navbar.jsx";
import { Blog } from "./pages/Blog.jsx";
import { BlogForm } from "./pages/BlogForm.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { AuthProvider } from './context/AuthContext.jsx'; 
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";

const Main = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar username="Juan Da" userImageUrl="/imgs/5.png" />
      )}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
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