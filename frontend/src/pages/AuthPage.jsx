import React, { useState } from 'react';
import axios from 'axios';

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? 'http://localhost:5001/api/auth/login' : 'http://localhost:5001/api/auth/signup';

    try {
      const res = await axios.post(endpoint, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('social_user', JSON.stringify(res.data.user));
      onAuthSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-wrapper">
      <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="btn-primary">
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#64748b' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span 
          style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }} 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
}