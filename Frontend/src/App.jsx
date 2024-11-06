import { useState } from "react";
import PostsList from "./components/PostsList";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <>
      <Signup setToken={setToken} />
      <Login setToken={setToken} />
      {token && <PostsList setToken={setToken} />}
    </>
  );
}

export default App;
