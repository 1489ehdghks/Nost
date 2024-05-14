import React from 'react';
import useThemeStore from '../store/themeStore';

const ThemedButton = () => {
    const { isDarkMode, isThemeMode, themes } = useThemeStore();
    let themeKey = 'spring';

    if (!isDarkMode && !isThemeMode) {
        themeKey = 'spring';
    } else if (isDarkMode && !isThemeMode) {
        themeKey = 'summer';
    } else if (!isDarkMode && isThemeMode) {
        themeKey = 'autumn';
    } else if (isDarkMode && isThemeMode) {
        themeKey = 'winter';
    }

    const theme = themes[themeKey];

    return (
        <button style={{
            backgroundColor: theme.buttonColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}>
            Click me!
        </button>
    );
};

export default ThemedButton;
