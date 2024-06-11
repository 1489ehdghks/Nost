import React, { useState } from 'react';
import axiosInstance from '../../features/auth/AuthInstance';
import useThemeStore from '../../shared/store/Themestore';
import './EditPasswordModal.scss';

const EditPasswordModal = ({ isOpen, onClose }) => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleSave = async () => {
    if (newPassword !== newPasswordConfirm) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/api/accounts/password/change/', {
        old_password: currentPassword,
        new_password1: newPassword,
        new_password2: newPasswordConfirm,
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      onClose();
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}> &times; </span>
        <h2>Edit Password</h2>
        <div className="input-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="newPasswordConfirm">Confirm New Password</label>
          <input type="password" id="newPasswordConfirm" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
        </div>
        <button className="save-button" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditPasswordModal;
