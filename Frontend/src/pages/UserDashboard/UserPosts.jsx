/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchUserPosts,
  deletePost,
  togglePublishPost,
} from '../../services/postsApi';
import Navbar from '../../components/Navbar/Navbar';
import styles from './UserPosts.module.css';

function UserPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserPosts() {
      try {
        setLoading(true);
        const data = await fetchUserPosts(token);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    }
    getUserPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId, token);
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleTogglePublish = async (postId, isPublished) => {
    try {
      const updatedPost = await togglePublishPost(postId, !isPublished, token);
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error('Toggle publish failed:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar token={token} />
        <div className={styles.loading}>Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar token={token} />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Your Posts</h1>
            <p className={styles.subtitle}>
              Drafts, published posts, and everything in between.
            </p>
          </div>

          <div className={styles.actions}>
            <Link to="/" className={styles.backLink}>
              ← All posts
            </Link>
            <Link to="/posts/new" className={styles.primaryButton}>
              New post
            </Link>
          </div>
        </header>

        <section className={styles.postsGrid}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <h2 className={styles.emptyTitle}>No posts yet</h2>
              <p className={styles.emptyText}>
                Get started by creating your first post.
              </p>
              <Link to="/posts/new" className={styles.primaryButton}>
                Create your first post
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <Link to={`/posts/${post.id}`} className={styles.postTitle}>
                    {post.title}
                  </Link>

                  <div className={styles.statusGroup}>
                    <span className={styles.statusIndicator}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className={styles.postActions}>
                  <button
                    onClick={() => handleTogglePublish(post.id, post.published)}
                    className={styles.toggleButton}
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <Link
                    to={`/posts/edit/${post.id}`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default UserPosts;
