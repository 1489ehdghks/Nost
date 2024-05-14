
import React from 'react';
import { Sun, Cloud } from 'react-feather';
import useThemeStore from '../../shared/store/Themestore';
import './ThemeModeToggle.scss';

const ThemeModeToggle = () => {
    const { isThemeMode, toggleThemeMode } = useThemeStore();

    return (
        <button className="theme-mode-toggle" onClick={toggleThemeMode}>
            {isThemeMode ? <Cloud className="theme-icon" /> : <Sun className="theme-icon" />}
        </button>
    );
};

export default ThemeModeToggle;
