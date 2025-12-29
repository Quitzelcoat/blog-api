/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ setToken, token }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setIsLoggedIn(!!savedToken);
  }, [token]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      // Call logoutUser if it exists in your userApi
      // logoutUser(savedToken);
    }
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logoDot} />
        <span className={styles.logoText}>Paperlane</span>
      </div>

      <div className={styles.actions}>
        {isLoggedIn ? (
          <>
            <Link to="/posts" className={styles.link}>
              My posts
            </Link>
            <button
              onClick={toggleTheme}
              className={styles.themeBtn}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={handleLogout} className={styles.buttonOutline}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link to="/signup" className={styles.buttonOutline}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
