/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchPosts, logoutUser } from "../services/api";

const PostsList = ({ setToken }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    logoutUser(token);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PostsList;
