import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link
          to="/register"
          className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
        >
          Register
        </Link>

        <Link
          to="/posts"
          className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
        >
          Posts
        </Link>

        <Link
          to="/add-post"
          className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
        >
          Add Post
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
