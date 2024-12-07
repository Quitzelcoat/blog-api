/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postsApi";
import { logoutUser } from "../services/userApi";
import { Link } from "react-router-dom";

const Dashboard = ({ setToken }) => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const getPosts = async () => {
      try {
        const data = await fetchPosts();

        const publishedPosts = data.filter((post) => post.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    logoutUser(token);
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>All Posts</h1>

      {isLoggedIn && (
        <div>
          <a href='/posts'>My posts</a>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <a href='/login'>Login</a>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <a href='/signup'>Sign Up</a>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.content}</p>
        </div>
      ))}

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Dashboard;
