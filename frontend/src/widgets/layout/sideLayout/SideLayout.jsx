import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/LogoutInstance';
import useThemeStore from '../../../shared/store/Themestore';
import './SideLayout.scss';

const SideLayout = ({ children }) => {
    const { themes, currentSeason } = useThemeStore(); // 테마 설정 사용
    const currentTheme = themes[currentSeason]; // 현재 시즌 테마 색상
    
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // HomePage로 리다이렉트
    };
    
    const handleProfile = () => {
        navigate('/profile'); // 프로필 페이지로 이동
    };

    return (
        <div className="side-layout" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="menu-icon" onClick={toggleSidebar}>
                <FaBars />
            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                <button>Main</button>
                <button onClick={handleProfile}>Profile</button>
                <button>My Book</button>
                <button>Setting</button>
                <button onClick={handleLogout}>logout</button>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default SideLayout;
