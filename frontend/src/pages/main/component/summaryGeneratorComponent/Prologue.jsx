import React from 'react';
import useThemeStore from '../../../../shared/store/Themestore';


const Prologue = ({ prologue, translatedPrologue, setTranslatedPrologue, handleRetryClick, handleNextClick }) => {
    const { font, themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    return (
        <div className="prologue-container">
            <div className="prologue-content" style={{ backgroundColor: currentTheme.secondary }}>
                <h2 className="prologue-heading" style={{ color: currentTheme.textColor, fontFamily: font.shapeFont }}>Prologue</h2>
                <textarea
                    value={translatedPrologue}
                    onChange={(e) => setTranslatedPrologue(e.target.value)}
                    className="prologue-textarea"
                    style={{ color: currentTheme.textColor }}
                />
            </div>
            <div className="prologue-action-buttons">
                <button
                    className="prologue-button"
                    onClick={handleRetryClick}
                    style={{
                        backgroundColor: 'transparent',
                        color: currentTheme.buttonTextColor,
                        fontFamily: font.shapeFont,
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = currentTheme.buttonBackgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    Retry
                </button>
                <button
                    className="prologue-button"
                    onClick={handleNextClick}
                    style={{
                        backgroundColor: 'transparent',
                        color: currentTheme.buttonTextColor,
                        fontFamily: font.shapeFont,
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = currentTheme.buttonBackgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Prologue;
