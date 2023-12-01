import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import * as authService from "../auth/authService.js";

export const BlogEdit = () => {
    const navigate = useNavigate();
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("");
    const [blogImage, setBlogImage] = useState(null);
  
    const { blogId } = useParams();
  
    useEffect(() => {
      const fetchBlogDetails = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/blogs/${blogId}`);
          if (!response.ok) throw new Error("Error al cargar los detalles del blog");
  
          const blogData = await response.json();
          setTitle(blogData.title);
          setDescription(blogData.description);
          setLink(blogData.link);
          setCategory(blogData.category);
          // Asumiendo que blogData tiene un campo para la imagen, si no, omitir esta línea
          setBlogImage(blogData.image_url); 
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchBlogDetails();
    }, [blogId]);

    const handleEditBlog = async (event) => {
        event.preventDefault();
        const user = authService.getUser();
        if (!user) {
          alert("No se ha detectado un usuario logueado.");
          return;
        }
      
        const formData = new FormData();
        formData.append("title", title); // Usa el estado en lugar del valor del input directamente
        formData.append("description", description);
        formData.append("link", link);
        formData.append("category", category);
        formData.append("user_id", user.id);
      
        // Solo agrega la imagen si el usuario seleccionó una nueva
        if (event.target.blogImage.files[0]) {
          formData.append("image", event.target.blogImage.files[0]);
        }
      
        try {
          const response = await fetch(`http://127.0.0.1:8000/blogedit/${blogId}`, {
            method: "PUT",
            body: formData, 
          });
      
          if (response.ok) {
            setConfirmationMessage("Blog actualizado con éxito. ¡Felicidades!");
            setTimeout(() => navigate("/"), 1500);
          } else {
            const errorResponse = await response.json();
            console.error("Error al actualizar el blog:", errorResponse);
            alert(`Error: ${errorResponse.detail}`);
          }
        } catch (error) {
          console.error("Error de conexión:", error);
        }
      };

  return (
    <div className="container mx-auto p-4 m-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Editar blog
      </h2>
      <form onSubmit={handleEditBlog} className="space-y-4">
        <div>
          <img 
              src={blogImage} 
              alt="Imagen del Blog" 
              className="rounded-full w-10 h-10" 
          />
          <label
            htmlFor="blogImage"
            className="block text-sm font-medium text-gray-700"
          >
            Imagen del Blog
          </label>
          <input
            type="file"
            id="blogImage"
            name="blogImage"
            className="mt-1 block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-tahiti-50 file:text-tahiti-700
                hover:file:bg-tahiti-100"
          />
        </div>
        <div>
          <label
            htmlFor="blogTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Blog
          </label>
          <input
            type="text"
            id="blogTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="blogTitle"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="blogDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="blogDescription"
            name="blogDescription"            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="blogLink"
            className="block text-sm font-medium text-gray-700"
          >
            Link
          </label>
          <input
            type="url"
            id="blogLink"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            name="blogLink"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="blogCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="blogCategory"
            name="blogCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="tecnologia">Tecnología</option>
            <option value="educacion">Educación</option>
            <option value="salud">Salud</option>
            <option value="viajes">Viajes</option>
            {/* Otras categorías aquí */}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-tahiti-500 text-white rounded-md hover:bg-tahiti-600"
        >
          Actualizar Blog
        </button>
      </form>
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
  );
};
