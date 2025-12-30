import { useEffect, useState } from "react";
import axios from "axios";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !userId) {
      alert("All fields are required");
      return;
    }

    const payload = {
      userId: Number(userId),
      title: title,
      body: content,
    };

    try {
      setSubmitting(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );

      console.log("Post created:", response.data);
      alert("Post submitted successfully");

      setTitle("");
      setContent("");
      setUserId("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to submit post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Post
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* User Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">User</label>
            {loadingUsers ? (
              <p className="text-gray-500">Loading users...</p>
            ) : (
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Content</label>
            <textarea
              placeholder="Post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
