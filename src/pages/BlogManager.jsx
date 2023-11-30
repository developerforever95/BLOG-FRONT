import React, { useState, useEffect } from "react";
import * as authService from "../auth/authService.js";

export const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const user = authService.getUser();

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:8000/user/${user.id}/blogs`)
        .then((response) => response.json())
        .then((data) => setBlogs(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-4">No estás logueado</div>;
  }

  // Funciones para editar y eliminar (a completar según tu lógica)
  const handleEdit = (blogId) => {
    console.log("Editar blog:", blogId);
    // Aquí va la lógica para editar
  };

  const handleDelete = (blogId) => {
    console.log("Eliminar blog:", blogId);
    // Aquí va la lógica para eliminar
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Mis Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="bg-tahiti-500 rounded-lg shadow-md mb-4 p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <div>
                <button onClick={() => handleEdit(blog.id)} className="text-blue-500 hover:text-blue-600 mr-2">
                  Editar
                </button>
                <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
