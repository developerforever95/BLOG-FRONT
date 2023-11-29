import { BlogCard } from "../components/BlogCard.jsx";

export const Blog = () => {
  const blogs = [
    { id: 1, title: "Blog 1", imageUrl: "/imgs/2.png" },
    { id: 2, title: "Blog 2", imageUrl: "/imgs/5.png" },
    { id: 3, title: "Blog 3", imageUrl: "/imgs/11.png" },
    { id: 4, title: "Blog 4", imageUrl: "/imgs/15.png" },
    { id: 5, title: "Blog 5", imageUrl: "/imgs/19.png" },
    { id: 6, title: "Blog 6", imageUrl: "/imgs/2.png" }
  ];

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