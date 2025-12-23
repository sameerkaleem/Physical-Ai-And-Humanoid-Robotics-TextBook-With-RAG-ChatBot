import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '@site/src/contexts/AuthContext';
import clsx from 'clsx';
import styles from './profile.module.css';

const ProfilePage = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client side to prevent SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during initial render on client
  if (!mounted || authLoading) {
    return (
      <Layout title="Profile" description="Loading user profile...">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    // Redirect to login page using browser navigation
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout title="User Profile" description="Manage your account settings">
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <h1>{user.name}</h1>
            <p className={styles.email}>{user.email}</p>
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.infoItem}>
              <label>Member Since</label>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Status</label>
              <span className={styles.statusActive}>Active</span>
            </div>
          </div>

          <div className={styles.profileActions}>
            <button
              onClick={handleLogout}
              className={clsx(styles.button, styles.buttonSecondary)}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;