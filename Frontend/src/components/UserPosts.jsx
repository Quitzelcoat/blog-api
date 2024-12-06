/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchUserPosts, deletePost, togglePublishPost } from "../services/api";

function UserPosts({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      try {
        const data = await fetchUserPosts(token);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    }

    getUserPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId, token);
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const handleTogglePublish = async (postId, isPublished) => {
    const updatedPost = await togglePublishPost(postId, !isPublished, token);
    setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
  };

  return (
    <div>
      <h1>Authoring Dashboard</h1>
      <button onClick={() => (window.location.href = "/posts/new")}>
        New Post
      </button>
      <button onClick={() => (window.location.href = "/")}>All Posts</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Status: {post.published ? "Published" : "Unpublished"}</p>
            <button
              onClick={() => handleTogglePublish(post.id, post.published)}
            >
              {post.published ? "Unpublish" : "Publish"}
            </button>
            <button
              onClick={() => (window.location.href = `/posts/edit/${post.id}`)}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;
