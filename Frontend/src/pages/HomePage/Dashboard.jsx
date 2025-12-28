/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/postsApi';
import { logoutUser } from '../../services/userApi';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = ({ setToken }) => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);

    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        const publishedPosts = data.filter((post) => post.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    getPosts();
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    logoutUser(token);
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>Paperlane</span>
        </div>

        <nav className={styles.nav}>
          {isLoggedIn && (
            <Link to="/posts" className={styles.link}>
              My posts
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/signup" className={styles.buttonOutline}>
              Sign up
            </Link>
          )}

          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className={styles.buttonOutline}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h1 className={styles.title}>All posts</h1>
          <p className={styles.subtitle}>
            A simple place to read and publish your writing.
          </p>
        </section>

        <section className={styles.posts}>
          {posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <h2 className={styles.postTitle}>
                <Link to={`/posts/${post.id}`} className={styles.postLink}>
                  {post.title}
                </Link>
              </h2>
              <p className={styles.postExcerpt}>
                {post.content?.slice(0, 160)}
                {post.content && post.content.length > 160 ? '…' : ''}
              </p>
              <Link to={`/posts/${post.id}`} className={styles.readLink}>
                Read more
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <p className={styles.empty}>
              No posts yet. Once you publish, they will appear here.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
