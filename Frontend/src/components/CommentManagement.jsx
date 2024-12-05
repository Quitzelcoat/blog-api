/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchComments, deleteComments } from "../services/api";

function CommentManagement({ postId, token }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const data = await fetchComments(postId);
      setComments(data);
    }
    getComments();
  }, [postId]);

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComments(commentId, token);
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.body}
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default CommentManagement;
