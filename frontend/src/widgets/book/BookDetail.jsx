import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import axiosInstance from '../../features/auth/AuthInstance';
import BookComment from './BookComment';
import './BookDetail.scss';
import { FaStar } from 'react-icons/fa';


const BookDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBookData(response.data);
        setIsLiked(response.data.is_liked);  // 사용자가 좋아요를 눌렀는지 여부 설정 
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
      const { like_bool, total_likes, book } = response.data;
      setIsLiked(like_bool);
      setBookData(book);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const rateBook = async (newRating) => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${id}/rating/`, { rating: newRating });
      const { rating, book } = response.data;
      setRating(rating); // 서버에서 업데이트된 평균 별점 설정
    } catch (error) {
      console.error('Error rating book:', error);
      if (error.response && error.response.data === 'You have already rated this book.') {
        alert('이미 처리되었습니다');
      }
    }
  };

  

  const handleStarClick = (index) => {
    const newRating = index + 1; // 클릭된 별의 인덱스에 1을 더하여 새로운 별점을 설정합니다.
    rateBook(newRating); // 새로운 별점을 서버로 전송합니다.
    console.log('raging : ', newRating);
  };  

  return (
    <div className="bookdetail" style={{ color: currentTheme.buttonTextColor }}>
      {bookData && (
        <div className="summary" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
          <h1>{bookData.title}</h1>
          {/* <img src={bookData.image} alt={bookData.header} /> */}
          {/* <p>{bookData.content}</p> */}
          <h3>Author : {bookData.user_nickname}</h3>
          <p>
            <button className="like" onClick={toggleLike}>
              {isLiked ? '❤️' : '♡'}
            </button>
            {bookData.total_likes} {bookData.is_liked.length ? 'Liked' : 'Likes'}
          </p>
          <div>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                onClick={() => handleStarClick(index)} // 클릭된 별의 인덱스를 handleStarClick 함수에 전달합니다.
                color={index < rating ? '#ffc107' : '#e4e5e9'}
                size={24}
                style={{ cursor: 'pointer' }}
              />
            ))}
            <p>
              {rating ? `Your Rating: ${rating}/5` : `Average Rating: ${bookData.average_rating}/5`}
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
