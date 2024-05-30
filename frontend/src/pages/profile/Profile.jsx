import React, { useState, useEffect } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import EditProfileModal from './EditProfileModal';
import './Profile.scss';

const Profile = () => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];

  const [user, setUser] = useState({
    name: "이름",
    nickname: "네임",
    email: "메일",
    profilePicture: null,
    likedPosts: [],
    bookmarkedPosts: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/accounts/login/', {
          method: 'GET',
          // 필요한 경우 헤더에 인증 토큰 등을 추가하세요
        });
        if (response.ok) {
          const userData = await response.json();
          setUser({
            name: userData.name,
            nickname: userData.nickname,
            email: userData.email,
          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = () => {
    // 회원 탈퇴 로직
    alert('회원 탈퇴가 완료되었습니다.');
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

  // 회원수정 모달
  const [ModalOpen, setModalOpen] = useState(false);

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const handleSaveUserInfo = (editUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...editUser,
    }));
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
          <div style={{ color: currentTheme.buttonTextColor }}>
            <button onClick={() => document.getElementById('profilePictureInput').click()}>
              사진 업로드
            </button>
          </div>
        </div>

        <div className="info">
          <div className="info-item">
            <label>Username: {user.name}</label>
            <label>Nickname: {user.nickname}</label>
            <label>Email: {user.email}</label>
          </div>

          <button className="edit-account" onClick={openModal}>
            회원 정보 수정 </button>
          <button className="delete-account" onClick={handleDeleteAccount}>
            회원 탈퇴 </button>
        </div>
      </div>

      <div className="list">
        <h2>찜한 게시글</h2>
        <ul> {user.bookmarkedPosts.map((post, index) => (<li key={index}>{post.title}</li>))}</ul>
        <h2>좋아요 표시한 게시글</h2>
        <ul> {user.likedPosts.map((post, index) => (<li key={index}>{post.title}</li>))}</ul>
      </div>

      <EditProfileModal user={user} isOpen={ModalOpen} onClose={closeModal} onSave={handleSaveUserInfo} />
    </div>
  );
};

export default Profile;