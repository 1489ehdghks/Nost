import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axiosInstance from '../../features/auth/AuthInstance';

const BookRating = ({ bookId, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axiosInstance.get(`http://127.0.0.1:8000/api/books/${bookId}/rating/`);
        const { rating } = response.data;
        setRating(rating);
        onRatingChange(rating);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setRating(0);
        } else {
          console.error('Error fetching user rating:', error);
        }
      }
    };

    fetchUserRating();
  }, [bookId]);

  const rateBook = async (newRating) => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/rating/`, { rating: newRating });
      const { rating } = response.data;
      setRating(rating);
      onRatingChange(rating);
    } catch (error) {
      console.error('Error rating book:', error);
      if (error.response && error.response.data === 'You have already rated this book.') {
        alert('이미 처리되었습니다');
      }
    }
  };

  const handleStarClick = (index) => {
    const newRating = index + 1;
    rateBook(newRating);
  };

  return (
    <p>
      {rating ? `Your Rating: ${rating}/5` : `Please Rate This Book`}
      <span style={{ marginLeft: '10px' }}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            onClick={() => handleStarClick(index)}
            color={index < rating ? '#fce146' : '#ffffff'}
            size={24}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </span>
    </p>
  );
};

export default BookRating;
