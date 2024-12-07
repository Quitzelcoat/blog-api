/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPosts, updatePost } from "../services/postsApi";

function EditPost({ token }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getPost() {
      const posts = await fetchPosts();
      const post = posts.find((p) => p.id === parseInt(id));
      setTitle(post.title);
      setContent(post.content);
    }
    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content };
    await updatePost(id, updatedPost, token);
    window.location.href = "/posts";
  };

  return (
    <div>
      <h1>Edit Post</h1>
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
        <button type='submit'>Update</button>
      </form>
    </div>
  );
}

export default EditPost;
