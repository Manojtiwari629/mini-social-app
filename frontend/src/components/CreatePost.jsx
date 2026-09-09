import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost({ user, onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('authorId', user.id);
    formData.append('authorName', user.username);
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5001/api/posts', formData);
      onPostCreated(res.data);
      setText('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
      <form onSubmit={handleCreate}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '14px',
            flexShrink: 0
          }}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <textarea
            rows={3}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#0f172a',
              background: 'transparent',
              resize: 'none',
              lineHeight: '1.5',
              paddingTop: '6px'
            }}
            placeholder="Share what's on your mind..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {preview && (
          <div style={{ position: 'relative', marginTop: '14px', marginBottom: '8px' }}>
            <img 
              src={preview} 
              alt="preview" 
              style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }} 
            />
            <button 
              type="button" 
              onClick={() => { setImage(null); setPreview(null); }} 
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}
            >✕</button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
          <label style={{ 
            cursor: 'pointer', 
            fontSize: '13px', 
            color: '#4f46e5', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            background: '#eef2ff',
            padding: '7px 14px',
            borderRadius: '10px'
          }}>
            📷 Add Image
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
          </label>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Posting...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}