import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      marginBottom: '20px',
      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
        Community Feed
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          @{user.username}
        </span>
        <button 
          onClick={onLogout} 
          style={{
            background: '#f1f5f9',
            border: 'none',
            padding: '7px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            color: '#475569'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}