import React from 'react';
import useThemeStore from '../../features/theme/store/Themestore';
import './styles/ThemedButton.scss';

const ThemedButton = ({ children, onClick, className }) => {
    const { themes, isThemeMode, isDarkMode } = useThemeStore();

    const getCurrentTheme = () => {
        if (isDarkMode && isThemeMode) {
            return themes.winter;
        } else if (isDarkMode && !isThemeMode) {
            return themes.summer;
        } else if (!isDarkMode && isThemeMode) {
            return themes.autumn;
        } else {
            return themes.spring;
        }
    };

    const currentTheme = getCurrentTheme();

    return (
        <button
            className={`themed-button ${className}`}
            onClick={onClick}
            style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
        >
            {children}
        </button>
    );
};

export default ThemedButton;
