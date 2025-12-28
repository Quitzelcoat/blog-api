import { useState } from 'react';
import { signUpUser } from '../../services/userApi';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(formData);
      setMessage('Signup successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      setMessage('Signup failed. Please try again.');
      console.log('Signup error:', error);
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
          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>
            Join a calm space for writing and publishing.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>

          {message && <p className={styles.message}>{message}</p>}

          <button type="submit" className={styles.primaryButton}>
            Sign up
          </button>
        </form>

        <p className={styles.helper}>
          Already have an account?{' '}
          <Link to="/login" className={styles.linkInline}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
