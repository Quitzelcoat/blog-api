import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PostList from "./components/PostList";
import NewPost from "./components/NewPost";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("Token is missing! Redirecting to login...");
    }
  }, []);

  const handlePostCreated = (newPost) => {
    console.log("New post created:", newPost);
  };

  return (
    <Router>
      <Routes>
        <Route path='/all-posts' element={<PostList token={token} />} />

        <Route
          path='/new-post'
          element={
            // Ensure token is available before rendering NewPost
            token ? (
              <NewPost token={token} onPostCreated={handlePostCreated} />
            ) : (
              <p>Loading...</p> // You can show a loading state or redirect if needed
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
