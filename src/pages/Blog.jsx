import React, { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard.jsx";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/blogs');
        if (!response.ok) {
          throw new Error('Error al cargar los blogs');
        }
        const blogs = await response.json();
        console.log(blogs);
        setBlogs(blogs);
      } catch (error) {
        console.error("Error al cargar los blogs:", error);
      }
    };

    fetchBlogs();
  }, []); 

  return (
    <div className="container mx-auto p-4 m-10 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Blogs publicados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
