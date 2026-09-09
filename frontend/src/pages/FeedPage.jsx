import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import API_BASE_URL from '../api';

export default function FeedPage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (deletedId) => {
    setPosts(posts.filter((p) => p._id !== deletedId));
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 16px' }}>
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <PostCard 
          key={post._id} 
          post={post} 
          user={user} 
          onPostDeleted={handlePostDeleted} 
        />
      ))}
    </div>
  );
}