import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      });

      if (response.ok) {
        setConfirmationMessage("Registro exitoso. Por favor, inicia sesión.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        console.error("Error en el registro:", await response.json());
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4 max-w-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Registro de Usuario
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Registrarse
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Iniciar Sesion{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>

        {confirmationMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-4 rounded relative"
            role="alert"
          >
            <strong className="font-bold">¡Hecho! </strong>
            <span className="block sm:inline">{confirmationMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
