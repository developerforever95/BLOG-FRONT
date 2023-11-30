import React, { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard.jsx";
import { useNavigate } from "react-router-dom";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/blogs");
        if (!response.ok) {
          throw new Error("Error al cargar los blogs");
        }
        const blogs = await response.json();
        setBlogs(blogs);
      } catch (error) {
        console.error("Error al cargar los blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };
  
  return (
    <div className="container mx-auto p-4 m-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleBlogClick(blog.id)}
            className="cursor-pointer"
          >
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};
