import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axiosInstance from '../../features/auth/AuthInstance';

const BookLike = ({ bookId, initialLikeStatus, onLikeStatusChange }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axiosInstance.get(`https://nost-stella.com/api/books/${bookId}/like/`);
        const { like_bool } = response.data;
        console.log("like", response.data);
        setIsLiked(like_bool);
        onLikeStatusChange(like_bool);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [bookId]);

  const toggleLike = async () => {
    try {
      const response = await axiosInstance.post(`https://nost-stella.com/api/books/${bookId}/like/`);
      const { like_bool } = response.data;
      console.log("like_bool", response.data);
      setIsLiked(like_bool);
      onLikeStatusChange(like_bool);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <p>
      {isLiked ? 'like' : 'unlike'}
      <span onClick={toggleLike}>
        <FaHeart
          color={isLiked ? '#ff0707' : '#ffffff'}
          size={20}
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        />
      </span>
    </p>
  );
};

export default BookLike;
