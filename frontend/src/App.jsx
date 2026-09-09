import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.clear();
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <FeedPage user={user} />
        </>
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}