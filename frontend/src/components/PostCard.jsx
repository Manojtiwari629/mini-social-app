import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function PostCard({ post, user, onPostDeleted }) {
  const [currentPost, setCurrentPost] = useState(post);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = currentPost.likes?.includes(user?.username);

  const handleLike = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/posts/${currentPost._id}/like`, { username: user.username });
      setCurrentPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/posts/${currentPost._id}`);
        if (onPostDeleted) onPostDeleted(currentPost._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/posts/${currentPost._id}/comment`, {
        username: user.username,
        text: commentText
      });
      setCurrentPost(res.data);
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #4f46e5)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '15px'
        }}>
          {currentPost.authorName?.[0]?.toUpperCase()}
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            {currentPost.authorName}
          </h4>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            {new Date(currentPost.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {user?.username === currentPost.authorName && (
          <button 
            onClick={handleDelete} 
            style={{
              marginLeft: 'auto',
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Delete
          </button>
        )}
      </div>

      {currentPost.text && (
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: currentPost.imageUrl ? '14px' : '6px', textAlign: 'left' }}>
          {currentPost.text}
        </p>
      )}

      {currentPost.imageUrl && (
        <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #f1f5f9', marginBottom: '14px', background: '#f8fafc' }}>
          <img 
            src={`${API_BASE_URL}${currentPost.imageUrl}`} 
            alt="post-media" 
            style={{ width: '100%', maxHeight: '380px', objectFit: 'contain', display: 'block' }} 
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
        <button 
          onClick={handleLike} 
          style={{
            background: isLiked ? '#fef2f2' : '#f8fafc',
            color: isLiked ? '#ef4444' : '#64748b',
            border: isLiked ? '1px solid #fecaca' : '1px solid #e2e8f0',
            padding: '7px 16px',
            borderRadius: '24px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span> {currentPost.likes?.length || 0}
        </button>
        <button 
          onClick={() => setShowComments(!showComments)} 
          style={{
            background: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            padding: '7px 16px',
            borderRadius: '24px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>💬</span> {currentPost.comments?.length || 0}
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {currentPost.comments?.length === 0 ? (
              <span style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>No comments yet. Start the conversation!</span>
            ) : (
              currentPost.comments?.map((c, i) => (
                <div key={i} style={{ background: '#f8fafc', padding: '9px 12px', borderRadius: '10px', fontSize: '13px', textAlign: 'left', border: '1px solid #f1f5f9' }}>
                  <strong style={{ color: '#4f46e5' }}>{c.username}: </strong>
                  <span style={{ color: '#334155' }}>{c.text}</span>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              className="input-field"
              style={{ marginBottom: 0 }} 
            />
            <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}