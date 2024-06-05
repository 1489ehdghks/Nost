import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import BookComment from './BookComment';
import BookLike from './BookLike';
import BookRating from './BookRating';
import axiosInstance from '../../features/auth/AuthInstance';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBookData(response.data);
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
  
  const handleDeleteBook = async () => {
    try {
      await axiosInstance.delete(`http://127.0.0.1:8000/api/books/${id}/`);
      // 삭제 성공 시, 메인 페이지로 이동
      navigate('/main');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleLikeStatusChange = (newLikeStatus) => {
    setBookData(prevBookData => ({
      ...prevBookData,
      is_liked: newLikeStatus
    }));
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { ...book, is_liked: newLikeStatus };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const handleRatingChange = (newRating) => {
    setBookData(prevBookData => ({
      ...prevBookData,
      user_rating: newRating
    }));
  };
  
  const buttonStyle = {
    backgroundColor: 'transparent',
    border: `1.5px solid ${currentTheme.secondary}`,
    color: currentTheme.buttonTextColor,
    marginLeft: '5px'
  };

  return (
    <div className="bookdetail" style={{ color: currentTheme.buttonTextColor }}>
      {bookData && (
        <div className="summary" >
          <div className="title-box" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
            <h1>{bookData.title}</h1>
            <h3>Author : {bookData.user_nickname}</h3>
            <div>
              <BookLike
                bookId={id}
                initialLikeStatus={bookData.is_liked}
                onLikeStatusChange={handleLikeStatusChange}
              />
              <BookRating
                bookId={id}
                initialRating={bookData.user_rating}
                onRatingChange={handleRatingChange}
              />
              <button 
                style={buttonStyle}>
                Delete Book
              </button>
            </div>
          </div>
          {bookData.chapters.map((chapter) => (
            <div key={chapter.id} className="chapter-box" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
              <h2>Chapter {chapter.chapter_num}</h2>
              <p className="chapter-p">{chapter.content}</p>
            </div>
          ))}
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
