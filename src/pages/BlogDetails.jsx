import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/blogs/${blogId}`);
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del blog");
        }
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchBlogDetails();
  }, [blogId]); 

  if (!blog) {
    return <div className="text-center">Cargando...</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4 m-10 bg-gray-100 rounded-lg" style={{ maxWidth: "800px" }}>
      <button onClick={handleBackClick} className="mb-4 bg-tahiti-500 hover:bg-tahiti-600 text-white font-bold py-2 px-4 rounded">
        Regresar
      </button>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden" >
        <div className="p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
          <img src={blog.image_url} alt={blog.title}  className="w-full md:w-1/2 lg:w-1/3 h-auto object-cover mx-auto m-10"/>       
          <p className="mb-4">{blog.description}</p>
          <p><strong>Link:</strong> <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{blog.link}</a></p>
          <p><strong>Categoría:</strong> {blog.category}</p>
        </div>
      </div>
    </div>
  );
};
