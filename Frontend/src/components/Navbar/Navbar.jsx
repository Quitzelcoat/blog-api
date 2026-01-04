/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/userApi';
import styles from './Navbar.module.css';

const Navbar = ({ setToken, token }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const savedToken = localStorage.getItem('token');
    try {
      if (savedToken) {
        // Optional backend call (won’t break if backend isn't running)
        await logoutUser(savedToken);
      }
    } catch (error) {
      console.log('Error logging out (server-side):', error);
    } finally {
      // Always clear client state regardless of server response
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login'); // redirect to login page
    }
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
