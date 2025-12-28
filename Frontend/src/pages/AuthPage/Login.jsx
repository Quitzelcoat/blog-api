/* eslint-disable react/prop-types */
import { useState } from 'react';
import { loginUser } from '../../services/userApi';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ email, password });
      setToken(token);
      localStorage.setItem('token', token);
      setEmail('');
      setPassword('');
      setError('');
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.log('Login failed:', err);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <p className={styles.appName}>
            <Link to="/" className={styles.brandLink}>
              <span className={styles.logoDot} />
              Paperlane
            </Link>
          </p>

          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>
            Log in to write, edit, and publish your posts.
          </p>
        </header>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.primaryButton}>
            Log in
          </button>
        </form>

        <p className={styles.helper}>
          New to Paperlane?{' '}
          <Link to="/signup" className={styles.linkInline}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
