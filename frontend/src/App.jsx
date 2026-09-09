import React, { useState, useEffect } from 'react';
import './styles.css';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('social_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('social_user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuthSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <FeedPage user={user} />
    </div>
  );
}