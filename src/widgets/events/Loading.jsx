import React from 'react';
import './Loading.scss';
import useThemeStore from '../../shared/store/Themestore';

const Loading = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    const loaderStyle = {
        borderBottomColor: currentTheme.buttonTextColor,
        backgroundMain: currentTheme.buttonBackgroundColor,
        backgroundSecondary: currentTheme.sidebarBg,
        backgroundBefore: currentTheme.additionalColors[3],
    };

    return (
        <div className="loading-wrapper">
            <div
                className="loader"
                style={{
                    '--loader-border-bottom': loaderStyle.borderBottomColor,
                    '--loader-background-main': loaderStyle.backgroundMain,
                    '--loader-background-secondary': loaderStyle.backgroundSecondary,
                    '--loader-background-before': loaderStyle.backgroundBefore
                }}
            ></div>
            <div className="wording">
                <div className="letter">L</div>
                <div className="letter">o</div>
                <div className="letter">a</div>
                <div className="letter">d</div>
                <div className="letter">i</div>
                <div className="letter">n</div>
                <div className="letter">g</div>
                <div className="letter circle"></div>
                <div className="letter circle"></div>
                <div className="letter circle"></div>
            </div>
        </div>
    );
};

export default Loading;