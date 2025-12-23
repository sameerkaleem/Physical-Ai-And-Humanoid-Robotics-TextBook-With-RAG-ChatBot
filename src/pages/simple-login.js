import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './login.module.css';

const SimpleLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        // Store user data in localStorage
        const userData = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
        };

        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirect to home or previous page
        window.location.href = '/';
      } else {
        setError('Please enter both email and password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Layout title="Sign In" description="Sign in to access the textbook">
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>
            <h1>Sign In</h1>
            <p>Access the Physical AI and Humanoid Robotics textbook</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={clsx(styles.button, styles.buttonPrimary)}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.signupLink}>
            <p>
              Don't have an account?{' '}
              <a href="/register" className={styles.link}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleLoginPage;