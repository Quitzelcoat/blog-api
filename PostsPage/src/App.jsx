import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PostList from "./components/PostList";

function App() {
  const [token] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PostList token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
