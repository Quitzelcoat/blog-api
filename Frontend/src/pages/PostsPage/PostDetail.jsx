/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostById } from '../../services/postsApi';
import Navbar from '../../components/Navbar/Navbar';
import Comments from '../../components/Comments/Comment';
import styles from './PostDetail.module.css';

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
        setError('Unable to fetch post details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar token={token} />
        <div className={styles.loading}>Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.page}>
        <Navbar token={token} />
        <div className={styles.error}>{error || 'Post not found.'}</div>
        <Link to="/" className={styles.backLink}>
          ← Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar token={token} />

      <article className={styles.article}>
        {/* Post header */}
        <header className={styles.header}>
          <Link to="/" className={styles.backButton}>
            ← All posts
          </Link>

          <div className={styles.postMeta}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                {post.author?.username || 'Anonymous'}
              </span>
              <span className={styles.postDate}>• Published</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className={styles.content}>
          <h1 className={styles.title}>{post.title}</h1>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className={styles.coverImage} // add CSS if you want
            />
          )}

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments section */}
        <section className={styles.commentsSection}>
          <Comments
            postId={id}
            token={token}
            isLoggedIn={isLoggedIn}
            userId={userId}
          />
        </section>
      </article>
    </div>
  );
}

export default PostDetail;
