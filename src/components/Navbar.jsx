import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const Navbar = ({ username, userImageUrl }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-tahiti-600 text-white">
            <div className="text-xl font-bold">Blog</div>
            <ul className="hidden md:flex space-x-4">
                <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link to="/blog-manager" className="hover:text-gray-300">Blog Manager</Link></li>
                <li><Link to="/blogs" className="hover:text-gray-300">Publicar blogs</Link></li>       
                <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
            </ul>
            <div className="flex items-center space-x-2">
                <img src={userImageUrl} alt="User" className="w-10 h-10 rounded-full"/>
                <span>{username}</span>
            </div>            
        </nav>
    );
};