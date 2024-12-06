import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PublicRoute from "./components/PublicRoute";
import UserPosts from "./components/UserPosts";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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
        <Route path='/posts/new' element={<NewPost token={token} />} />
        <Route path='/posts/edit/:id' element={<EditPost token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
