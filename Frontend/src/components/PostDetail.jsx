/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/postsApi";
import Comments from "./Comment";

function PostDetail({ token, isLoggedIn, userId }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        setError("Unable to fetch post details. Please try again later.", err);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        <strong>Content:</strong> {post.content}
      </p>
      <p>
        <strong>Author:</strong> {post.author.username}
      </p>

      <Comments
        postId={id}
        token={token}
        isLoggedIn={isLoggedIn}
        userId={userId}
      />
    </div>
  );
}

export default PostDetail;
