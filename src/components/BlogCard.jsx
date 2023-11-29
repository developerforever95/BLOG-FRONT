export const BlogCard = ({ blog }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300">
          <img className="w-full" src={blog.image_url} alt={blog.title} />
          <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{blog.title}</div>
          </div>
      </div>
    );
  };