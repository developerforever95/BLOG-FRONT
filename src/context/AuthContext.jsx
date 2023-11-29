import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (token) => {
    // Aquí podrías configurar el usuario en función del token
    setUser({ token });
    localStorage.setItem('token', token);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  // Valor que se pasa al contexto
  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
