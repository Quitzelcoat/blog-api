/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from '../../services/commentApi';
import styles from './Comment.module.css';
import { Link } from 'react-router-dom';

function Comments({ postId, token, isLoggedIn, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    }
    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const addedComment = await createComment(
        postId,
        { content: newComment },
        token
      );
      setComments((prev) => [...prev, addedComment]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleEditComment = async () => {
    if (!editContent.trim()) return;
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
      setEditContent('');
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await deleteComment(id, token);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const startEdit = (comment) => {
    setEditingComment(comment);
    setEditContent(comment.content);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {comments.length === 0
            ? 'No comments yet'
            : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
        </h3>
      </div>

      <div className={styles.list}>
        {comments.map((comment) => (
          <article key={comment.id} className={styles.comment}>
            {editingComment?.id === comment.id ? (
              <div className={styles.editForm}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit your comment..."
                  className={styles.editTextarea}
                  rows="3"
                />
                <div className={styles.editActions}>
                  <button
                    onClick={handleEditComment}
                    className={styles.editSave}
                    disabled={!editContent.trim()}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingComment(null);
                      setEditContent('');
                    }}
                    className={styles.editCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Comment header: avatar + author + time */}
                <header className={styles.meta}>
                  <div className={styles.metaText}>
                    <span className={styles.author}>
                      {comment.username || 'Anonymous'}
                    </span>
                    {/* Add time when available: <span className={styles.time}>• 2 hours ago</span> */}
                  </div>
                </header>

                {/* Comment body */}
                <div className={styles.body}>
                  <p className={styles.content}>{comment.content}</p>
                </div>

                {/* Comment actions */}
                {isLoggedIn && comment.authorId === userId && (
                  <footer className={styles.actions}>
                    <button
                      onClick={() => startEdit(comment)}
                      className={styles.actionButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={styles.actionButton}
                    >
                      Delete
                    </button>
                  </footer>
                )}
              </>
            )}
          </article>
        ))}
      </div>

      {/* Add new comment form */}
      {isLoggedIn ? (
        <form
          className={styles.newCommentForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
        >
          <div className={styles.inputGroup}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.newTextarea}
              rows="3"
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!newComment.trim()}
            >
              Post comment
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <Link to="/login" className={styles.loginLink}>
            Sign in to add a comment
          </Link>
        </div>
      )}
    </section>
  );
}

export default Comments;
