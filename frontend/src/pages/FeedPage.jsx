import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function FeedPage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/posts');
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
    <div>
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} user={user} onPostDeleted={handlePostDeleted} />
      ))}
    </div>
  );
}