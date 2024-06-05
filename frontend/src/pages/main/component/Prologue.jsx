import React from 'react';
import useThemeStore from '../../../shared/store/Themestore';

const Prologue = ({ prologue }) => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    return (
        <div className="SummaryGenerator-page right-page">
            <div className="prologue-area" style={{ backgroundColor: currentTheme.secondary, color: currentTheme.textColor }}>
                <p>{prologue}</p>
            </div>
        </div>
    );
};

export default Prologue;
