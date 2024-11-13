import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PostsList from "./components/PostsList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
        <Route
          path='/'
          element={
            <ProtectedRoute token={token}>
              <PostsList setToken={setToken} />
            </ProtectedRoute>
          }
        />

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
      </Routes>
    </Router>
  );
}

export default App;
