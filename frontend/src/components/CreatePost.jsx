import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function CreatePost({ user, onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return;

    const formData = new FormData();
    formData.append('authorName', user.username);
    if (text) formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onPostCreated(res.data);
      setText('');
      setImage(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          placeholder={`What's on your mind, ${user?.username || ''}?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-field"
          style={{ resize: 'none' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#4f46e5', fontWeight: '500' }}>
            <span>📷 Add Image</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
              style={{ display: 'none' }} 
            />
          </label>
          {image && <span style={{ fontSize: '12px', color: '#64748b' }}>{image.name}</span>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}