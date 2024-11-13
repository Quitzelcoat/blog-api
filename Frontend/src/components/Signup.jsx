import { useState } from "react";
import { signUpUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUser(formData);
      setMessage("Signup successful! You can now log in.", response);

      navigate("/login");
    } catch (error) {
      setMessage("Signup failed. Please try again.", error);
      console.log("Signup error:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type='submit'>sign Up</button>
      </form>

      <button>
        <Link to='/login'>LogIn</Link>
      </button>

      <p>{message}</p>
    </div>
  );
};

export default Signup;
