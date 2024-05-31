import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import axiosInstance from '../../features/auth/AuthInstance';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');

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

  const handleAddComment = async () => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${id}/comments/`, {
        content: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글을 추가하는 중에 오류가 발생했습니다.');
    }
  };

  const handleEditComment = async (commentId, updatedContent) => {
    try {
      const response = await axiosInstance.put(`http://127.0.0.1:8000/api/books/${id}/comments/${commentId}/`, {
        content: updatedContent,
      });

      setComments(comments.map(comment => comment.id === commentId ? response.data : comment));
      setEditingComment(null);
      setUpdatedContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
      alert('댓글을 수정하는 중에 오류가 발생했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`http://127.0.0.1:8000/api/books/${id}/comments/${commentId}/`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글을 삭제하는 중에 오류가 발생했습니다.');
    }
  };

  return (
    <div className="book-detail" style={{ color: currentTheme.textColor }}>
      {bookData && (
        <div className="summary" style={{ backgroundColor: currentTheme.buttonBackgroundColor }}>
          <h1>{bookData.title}</h1>
          {/* <img src={bookData.image} alt={bookData.header} /> */}
          {/* <p>{bookData.content}</p> */}
          <p>{bookData.user_nickname}</p>
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
              <p>{comment.content} <br />{comment.user_nickname} <small>on {comment.created_at}</small></p>
              <button onClick={() => {
                setEditingComment(comment.id);
                setUpdatedContent(comment.content);
              }}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          ))}
        </div>
        {editingComment && (
          <div>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            ></textarea>
            <button onClick={() => handleEditComment(editingComment, updatedContent)}>Save</button>
            <button onClick={() => setEditingComment(null)}>Cancel</button>
          </div>
        )}
        <textarea
          placeholder="Your comments"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
          onClick={handleAddComment}> Add </button>
      </div>
    </div>
  );
};

export default BookDetail;
