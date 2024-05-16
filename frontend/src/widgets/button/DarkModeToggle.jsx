// /src/widgets/button/DarkModeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'react-feather';
import useThemeStore from '../../features/theme/store/Themestore';
import './styles/DarkModeToggle.scss';

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useThemeStore();

    return (
        <label className="toggle-wrapper">
            <input
                className="toggle-checkbox"
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <div className="toggle-slot">
                <div className="sun-icon-wrapper">
                    <Sun className="sun-icon" />
                </div>
                <div className="toggle-button"></div>
                <div className="moon-icon-wrapper">
                    <Moon className="moon-icon" />
                </div>
            </div>
        </label>
    );
};

export default DarkModeToggle;
