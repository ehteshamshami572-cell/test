import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/register";

import PostList from "./Components/PostList";
import AddPost from "./Components/Addpost";
import PostDetail from "./Components/PostDeatils";
import Navbar from "./Components/NavBar";

function App() {
  return (
    
      <>
      <BrowserRouter>
     
     
      <Navbar/>
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
       </BrowserRouter>
       </>
    
  
  );
}

export default App;
