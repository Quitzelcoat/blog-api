/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../services/postsApi';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Dashboard.module.css';

const getExcerpt = (htmlContent) => {
  if (!htmlContent) return '';

  // Create temp div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Get text content and truncate
  let text = tempDiv.textContent || tempDiv.innerText || '';
  return text.length > 160 ? text.slice(0, 160) + '…' : text;
};

const Dashboard = ({ setToken, token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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

  return (
    <div className={styles.page}>
      <Navbar setToken={setToken} token={token} />

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

              <div
                className={styles.postExcerpt}
                dangerouslySetInnerHTML={{
                  __html: getExcerpt(post.content),
                }}
              />

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
