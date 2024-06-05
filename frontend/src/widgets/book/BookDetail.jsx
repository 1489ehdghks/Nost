import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import BookComment from './BookComment';
import BookLike from './BookLike';
import BookRating from './BookRating';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
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
