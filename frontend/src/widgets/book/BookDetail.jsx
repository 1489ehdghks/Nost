import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import BookComment from './BookComment';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBookData(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/books/${id}/comments/`)
      .then(response => {
        setComments(response.data || []);
        console.log('comment :', response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  return (
    <div className="bookdetail" style={{ color: currentTheme.buttonTextColor }}>
      {bookData && (
        <div className="summary" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
          <h1>{bookData.title}</h1>
          {/* <img src={bookData.image} alt={bookData.header} /> */}
          {/* <p>{bookData.content}</p> */}
          <h3>Author : {bookData.user_nickname}</h3>
          <p>❤️ {bookData.is_liked.length} ⭐ {bookData.average_rating}/5</p>  {/* 배열의 길이로 좋아요 수 출력 */}
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
