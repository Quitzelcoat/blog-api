/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPost } from "../services/api";

function NewPost({ token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, published: false };
    await createPost(newPost, token);
    window.location.href = "/posts";
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Post Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder='Post Body'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}

export default NewPost;
