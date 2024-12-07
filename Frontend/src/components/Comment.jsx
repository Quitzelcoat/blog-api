/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentApi";

function Comments({ postId, token }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const addedComment = await createComment(
        postId,
        { content: newComment },
        token
      );
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleEditComment = async () => {
    try {
      const updatedComment = await updateComment(
        editingComment.id,
        editContent,
        token
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingComment.id ? updatedComment : comment
        )
      );
      setEditingComment(null);
      setEditContent("");
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id, token);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingComment && editingComment.id === comment.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={handleEditComment}>Save</button>
              <button onClick={() => setEditingComment(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>

              <button
                onClick={() => {
                  setEditingComment(comment);
                  setEditContent(comment.content);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <textarea
        placeholder='Add a comment'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Submit</button>
    </div>
  );
}

export default Comments;
