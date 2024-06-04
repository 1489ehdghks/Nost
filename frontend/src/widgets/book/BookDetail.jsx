import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import axiosInstance from '../../features/auth/AuthInstance';
import BookComment from './BookComment';
import './BookDetail.scss';
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0); // 별점 상태 추가
  const [books, setBooks] = useState([]);
  const [like_bool, setIsLiked] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBookData(response.data);
        setIsLiked(response.data.is_liked);
        console.log('data : ', response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/books/${id}/comments/`)
      .then(response => {
        setComments(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const toggleLike = async () => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${id}/like/`);
      const { like_bool, total_likes } = response.data;
      setIsLiked(like_bool);
      setBookData(prevBookData => ({
        ...prevBookData,
        is_liked: like_bool,
        total_likes: total_likes
      }));
      const updatedBooks = books.map(book => {
        if (book.id === id) {
          return {...book, is_liked: like_bool};
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const rateBook = async (newRating) => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${id}/rating/`, { rating: newRating });
      const { rating } = response.data;
      setBookData(prevBookData => ({
        ...prevBookData,
        user_rating: rating
      }));
      setRating(rating); // 사용자가 별점을 준 경우 별점 상태 업데이트
  
      // 사용자의 최신 별점을 가져와서 업데이트
      userRate();
    } catch (error) {
      console.error('Error rating book:', error);
      if (error.response && error.response.data === 'You have already rated this book.') {
        alert('이미 처리되었습니다');
      }
    }
  };

  const userRate = async () => {
    try {
      const response = await axiosInstance.get(`http://127.0.0.1:8000/api/books/${id}/rating/`);
      const { rating } = response.data;
      setRating(rating); // 사용자의 별점 업데이트
    } catch(error) {
      console.error('Error fetching user rating:', error);
    }
  };

  useEffect(() => {
    // 페이지 로드 시 사용자의 별점을 가져오기 위해 호출
    userRate();
  }, []);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    rateBook(newRating);
    console.log('raging : ', newRating);
  };  

  return (
    <div className="bookdetail" style={{ color: currentTheme.buttonTextColor }}>
      {bookData && (
        <div className="summary" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
          <h1>{bookData.title}</h1>
          <h3>Author : {bookData.user_nickname}</h3>
          <div className="like">
            <p> like {bookData.total_likes} <FaHeart
            onClick={toggleLike}
            color={bookData.is_liked ? '#ff0707' : '#e4e5e9'}
            size={16}
            style={{ cursor: 'pointer' }}/>  </p>
          </div>
          <div>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                onClick={() => handleStarClick(index)}
                color={index < rating ? '#ffc107' : '#e4e5e9'}
                size={24}
                style={{ cursor: 'pointer' }}
              />
            ))}
            <p>
              {rating ? `Your Rating: ${rating}/5` : `Please Rate This Book`}
            </p>
          </div>
        </div>
      )}
      <BookComment
        bookId={id}
        comments={comments}
        setComments={setComments}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default BookDetail;
