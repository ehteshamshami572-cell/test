import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Post Listing
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <Link to={`/posts/${post.id}`}>
              <h3 className="text-xl font-semibold mb-2 text-blue-600 hover:underline">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {post.body.length > 100
                  ? post.body.substring(0, 100) + "..."
                  : post.body}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
