/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { deletePost, fetchPosts, togglePublishPost } from "../services/api";

const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch the posts");
        console.log(err);
      }
    };

    loadPosts();
  }, []);

  const handlePublish = async (postId, isPublished) => {
    try {
      const updatedPost = await togglePublishPost(postId, !isPublished, token);
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, published: updatedPost.published }
            : post
        )
      );
    } catch (err) {
      console.log("Failed to toggle publish status", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId, token);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.log("Failed to delete the post", err);
    }
  };

  return (
    <>
      <h2>My Posts</h2>

      {error && <p>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Status: {post.published ? "Published" : "Unpublished"}</p>
            <button onClick={() => handlePublish(post.id, post.published)}>
              {post.published ? "Unpublished" : "Publish"}
            </button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
