import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    let isMounted = true; 
    setLoading(true);
    setError(null);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setTimeout(() => {
          if (isMounted) {
            setPost(res.data);
            setLoading(false);
          }
        }, 2000); 
      })
      .catch((err) => {
        setTimeout(() => {
          if (isMounted) {
            setError("Failed to fetch post.");
            setLoading(false);
          }
        }, 2000);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading post #{id}...
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        {error}
      </p>
    );

  if (!post)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No post data available.
      </p>
    );

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-100 min-h-screen">
      <article className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">{post.body}</p>
        <hr className="border-gray-300 mb-4" />
        <div className="text-sm text-gray-500">
          <span className="mr-4">Author ID: {post.userId}</span>
          <span>Post ID: {post.id}</span>
        </div>
      </article>
    </div>
  );
}

export default PostDetail;
