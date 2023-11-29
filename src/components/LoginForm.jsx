import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import * as authService from '../auth/authService.js'; 


export const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const username = event.target.email.value;
      const password = event.target.password.value;
  
      try {
        const token = await authService.login(username, password);
        login(token);
        navigate('/');
      } catch (error) {
        alert(error); 
      }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input type="text" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" name="password" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Iniciar Sesión</button>
            </form>
            <div className="text-center mt-4">
                <p>No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-600">Regístrate</Link></p>
            </div>
        </div>
    );
};