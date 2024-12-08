import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PublicRoute from "./components/PublicRoute";
import UserPosts from "./components/UserPosts";
import EditPost from "./components/EditPost";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    } else {
      localStorage.removeItem("token");
      setUserId(null);
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard setToken={setToken} />} />

        <Route
          path='/signup'
          element={
            <PublicRoute token={token}>
              <Signup setToken={setToken} />
            </PublicRoute>
          }
        />

        <Route
          path='/login'
          element={
            <PublicRoute token={token}>
              <Login setToken={setToken} />
            </PublicRoute>
          }
        />

        <Route path='/posts' element={<UserPosts token={token} />} />

        <Route
          path='/posts/:id'
          element={
            <PostDetail token={token} isLoggedIn={isLoggedIn} userId={userId} />
          }
        />

        <Route path='/posts/new' element={<NewPost token={token} />} />

        <Route path='/posts/edit/:id' element={<EditPost token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
