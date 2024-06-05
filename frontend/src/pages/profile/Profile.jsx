import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import useAuthStore from '../../shared/store/AuthStore';
import axiosInstance from '../../features/auth/AuthInstance';
import EditProfileModal from './EditProfileModal';
import EditPasswordModal from './EditPasswordModal';
import LikeBookList from './LikeBookList';
import './Profile.scss';

const Profile = () => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const navigate = useNavigate();
  const { userId, nickname, email, setNickname, reset } = useAuthStore((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    email: state.email,
    setNickname: state.setNickname,
    reset: state.reset, // reset 함수 추가 회원탈퇴시
  }));

  useEffect(() => {
    if (userId) {
      setUser((prevUser) => ({
        ...prevUser,
        nickname: nickname,
        email: email,
      }));
    }
  }, [nickname, email, userId]);

  const [user, setUser] = useState({
    nickname: nickname || "네임",
    email: email || "메일",
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT6uhVlGoDqJhKLfS9W_HQOoWJCf-_lsBZzw&s',
    likedPosts: [],
  });

  const handleDeleteAccount = async () => {
    const password = prompt("회원 탈퇴를 진행하시려면 비밀번호를 입력하세요:");
    if (password !== null) {
      try {
        const response = await axiosInstance.delete('/api/accounts/profile/', {
          data: {
            password: password,
            refresh_token: useAuthStore.getState().refreshToken, // 추가
          }
        });
        alert('회원 탈퇴가 완료되었습니다.');
        reset(); // 상태 초기화 호출
        navigate('/');
        // 탈퇴 후 추가적인 로직을 여기에 추가할 수 있습니다.
      } catch (error) {
        console.error('회원 탈퇴 실패:', error);
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 회원정보 수정모달
  const [ModalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };
  
  // 비밀번호 수정모달
  const [PasswordModalOpen, setPasswordModalOpen] = useState(false);
  const openPasswordModal = () => { setPasswordModalOpen(true); };
  const closePasswordModal = () => { setPasswordModalOpen(false); };

  const handleSaveUserInfo = async (editUser) => {
    try {
      const response = await axiosInstance.put('/api/accounts/profile/', {
        nickname: editUser.nickname,
      });

      setUser((prevUser) => ({
        ...prevUser,
        ...editUser,
      }));

      setNickname(editUser.nickname);

      console.log("회원정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error('회원정보 업데이트 실패:', error);
      alert('회원정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="profile" style={{ color: currentTheme.textColor }}>
      <div className="header">
        <h1>Profile</h1>
      </div>
      <div className="content">
        <div className="picture-section">
          <div className="profile-picture-box">
            <img
              src={user.profilePicture || 'default-profile-picture-url'}
              alt="Profile"
              className="picture"
            />
            <input
              type="file"
              accept="image/*"
              id="profilePictureInput"
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />
          </div>
          <div>
            <button onClick={() => document.getElementById('profilePictureInput').click()}>
              사진 업로드
            </button>
          </div>
        </div>

        <div className="info">
          <div className="info-item">
            <label>Nickname: {user.nickname}</label>
            <label>Email: {user.email}</label>
          </div>

          <button className="edit-account" onClick={openModal}>
            회원 정보 수정 </button>
          <EditProfileModal user={user} isOpen={ModalOpen} onClose={closeModal} onSave={handleSaveUserInfo} />

          <button className="change-password" onClick={openPasswordModal}>  
            비밀번호 변경
          </button>
          <EditPasswordModal isOpen={PasswordModalOpen} onClose={closePasswordModal} /> 

          <button className="delete-account" onClick={handleDeleteAccount}>
            회원 탈퇴 </button>
        </div>
      </div>

      <div className="list">
        <h2>Liked Book List</h2>
        <ul> <LikeBookList /> </ul>
      </div>
    </div>
  );
};

export default Profile;
