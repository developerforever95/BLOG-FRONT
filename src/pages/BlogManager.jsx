import React, { useState, useEffect } from "react";
import * as authService from "../auth/authService.js";
import { useNavigate } from "react-router-dom";

export const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const user = authService.getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:8000/user/${user.id}/blogs`)
        .then((response) => response.json())
        .then((data) => setBlogs(data))
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  if (!user) {
    return <div className="text-center py-4">No estás logueado</div>;
  }


  const handleEdit = (blogId) => {
    navigate(`/blogedit/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("¿Estás seguro de querer eliminar este blog?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/blogdelete/${blogId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el blog');
        }

        // Actualizar el estado para quitar el blog eliminado
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        alert("Blog eliminado con éxito");

      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al eliminar el blog");
      }
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Mis Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="bg-tahiti-500 rounded-lg shadow-md mb-4 p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl tituloBlogManager font-bold">{blog.title}</h2>
              <div>
                <button onClick={() => handleEdit(blog.id)} 
                        className="text-tahiti-700 botonBlogManager mr-2 transition duration-300 ease-in-out transform hover:scale-110">
                  Editar
                </button>
                <button onClick={() => handleDelete(blog.id)} 
                        className="text-tahiti-700 botonBlogManager transition duration-300 ease-in-out transform hover:scale-110">
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