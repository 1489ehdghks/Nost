import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/LogoutInstance';
import useThemeStore from '../../../shared/store/Themestore';
import './SideLayout.scss';

const SideLayout = ({ children }) => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleMain = () => {
        navigate('/');
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleMybooklist = () => {
        navigate('/Mybooklist'); // 내 북페이지로 이동
    };

    return (
        <div className="side-layout" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="menu-icon" onClick={toggleSidebar}>
                <FaBars />
            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                <button onClick={handleMain}>Main</button>
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleMybooklist}>My Book</button>
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
