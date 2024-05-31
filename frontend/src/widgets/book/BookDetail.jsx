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
  const [editingCommentId, setEditingCommentId] = useState(null);
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
      setEditingCommentId(null);
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
      <div className="comment-box" style={{ color: currentTheme.textColor }}>
        <h2>Comment Box</h2>
        <div className="comments">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src="https://via.placeholder.com/50" alt="User" />
              <p>{comment.content} <br />{comment.user_nickname} <small>on {comment.created_at}</small></p>
              <button onClick={() => {
                setEditingCommentId(comment.id);
                setUpdatedContent(comment.content);
              }}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              {editingCommentId === comment.id && (
                <div className="comment-edit">
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  ></textarea>
                  <button onClick={() => handleEditComment(comment.id, updatedContent)}>Save</button>
                  <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <textarea
          placeholder="Your comments"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor, marginBottom: '150px' }}
          onClick={handleAddComment}> Add </button>
      </div>
    </div>
  );
};

export default BookDetail;
