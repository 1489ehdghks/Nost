import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 책 데이터를 가져오는 API 요청
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBookData(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });

    // 댓글 데이터를 가져오는 API 요청
    axios.get(`http://127.0.0.1:8000/api/books/${id}/comments/`)
      .then(response => {
        setComments(response.data || []); // 댓글이 없을 경우 빈 배열로 초기화
        console.error('comments:', response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  return (
    <div className="book-detail" style={{ color: currentTheme.textColor }}>
      {bookData && (
        <div className="summary" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
          <h1>{bookData.title}</h1>
          {/* <img src={bookData.image} alt={bookData.header} /> */}
          {/* <p>{bookData.content}</p> */}
          <p>{bookData.user_id}</p>
          <p>{bookData.is_liked.length}</p>  {/* 배열의 길이로 좋아요 수 출력 */}
          <p>{bookData.average_rating}</p>
        </div>
      )}
      <div className="comment-box">
        <h2>Comment Box</h2>
        <div className="comments">
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <img src="https://via.placeholder.com/50" alt="User" />
              <p>{comment.content} <br />{comment.id} <small>on {comment.created_at}</small></p>
            </div>
          ))}
        </div>
        <textarea placeholder="Your comments"></textarea>
        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Add</button>
      </div>
    </div>
  );
};

export default BookDetail;
