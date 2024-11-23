/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPost } from "../services/api";

const NewPost = ({ token, onPostCreated }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = await createPost(formData, token);

      onPostCreated(newPost);
      setFormData({ title: "", content: "" });
    } catch (err) {
      setError("Failed to create post.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name='content'
          placeholder='Content'
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default NewPost;
