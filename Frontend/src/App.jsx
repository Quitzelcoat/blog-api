import { useState } from "react";
import PostsList from "./components/PostsList";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <>
      <Login setToken={setToken} />
      {token && <PostsList setToken={setToken} />}
    </>
  );
}

export default App;
