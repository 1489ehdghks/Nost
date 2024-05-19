import React from 'react';
import './NovelContinuation.scss';
import useThemeStore from '../../../shared/store/Themestore';

const NovelContinuation = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    return (
        <div className="novel-continuation section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="novel-result">
                <p>Result of Novel</p>
            </div>
            <div className="content">
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Ex 1</button>
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Ex 2</button>
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Ex 3</button>
            </div>
            <div className="user-text-area">
                <textarea placeholder="User Text Area" style={{ backgroundColor: currentTheme.secondary, color: currentTheme.textColor }}></textarea>
            </div>
        </div>
    );
};

export default NovelContinuation;
