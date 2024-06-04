import React, { useState } from 'react';
import axiosInstance from '../../features/auth/AuthInstance';
import './BookComment.scss';

const BookComment = ({ bookId, comments, setComments, currentTheme }) => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [visibleComments, setVisibleComments] = useState(5); // 현재 보이는 댓글 수를 관리하는 상태

  const handleAddComment = async () => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/comments/`, {
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
      const response = await axiosInstance.put(`http://127.0.0.1:8000/api/books/${bookId}/comments/${commentId}/`, {
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
      await axiosInstance.delete(`http://127.0.0.1:8000/api/books/${bookId}/comments/${commentId}/`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글을 삭제하는 중에 오류가 발생했습니다.');
    }
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: `1.5px solid ${currentTheme.buttonBackgroundColor}`,
    color: currentTheme.textColor,
    marginLeft: '5px'
  };

  return (
    <div className="comment-box" style={{ color: currentTheme.textColor }}>
      <h2>Comment Box</h2>
      <div className="comments">
        {comments.slice(0, visibleComments).map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-avatar" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
              {comment.user_nickname.charAt(0).toUpperCase()}
            </div>
            <div className="comment-content">
              <p>{comment.content} </p>
              <p style={{ color: currentTheme.sidebarBg }}>{comment.user_nickname}
                <small> | {new Date(comment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</small>
                </p>
              <div>
                <button style={buttonStyle} onClick={() => { setEditingCommentId(comment.id); setUpdatedContent(comment.content); }}>Edit</button>
                <button style={buttonStyle} onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                {editingCommentId === comment.id && (
                  <div>
                    <textarea value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}></textarea>
                    <button style={buttonStyle} onClick={() => handleEditComment(comment.id, updatedContent)}>Save</button>
                    <button style={buttonStyle} onClick={() => setEditingCommentId(null)}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {visibleComments < comments.length && (
          <button style={buttonStyle} onClick={() => setVisibleComments(visibleComments + 5)}>더보기</button>
        )}
      </div>
      <textarea
          placeholder="Your comments"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}>
        </textarea>
        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor, marginBottom: '150px' }}
          onClick={handleAddComment}> Add </button>
    </div>
  );
};

export default BookComment;
