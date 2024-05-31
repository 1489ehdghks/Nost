import React, { useState, useEffect } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import './EditProfileModal.scss';

const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  
  const [editedNickname, setEditedNickname] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditedNickname(user.nickname);
    }
  }, [isOpen, user]);

  const handleSave = () => {
    onSave({
      nickname: editedNickname,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}> &times; </span>
        <h2>Edit Profile</h2>
        <div className="input-group">
          <label htmlFor="nickname">Nickname</label>
          <input type="text" id="nickname" value={editedNickname} onChange={(e) => setEditedNickname(e.target.value)}/>
        </div>
        
        <button className="save-button" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
        onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
