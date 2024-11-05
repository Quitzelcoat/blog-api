/* eslint-disable react/prop-types */
import { useState } from "react";
import { loginUser } from "../services/api";

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const { token } = await loginUser({ email, password });
      setToken(token);
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Invalid email or password, Please try again");
      console.log("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && (
        <div
          className='error-message'
          style={{ color: "red", marginBottom: "10px" }}
        >
          {error}
        </div>
      )}

      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;