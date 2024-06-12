import React from 'react';
import useThemeStore from '../../../../shared/store/Themestore';
import useBookStore from '../../../../shared/store/BookStore';

const Summary = ({ recommendations, handleRecommendationClick, userText, setUserText, handleUserTextSubmit }) => {
    const { themes, currentSeason } = useThemeStore();
    const { chapterNum } = useBookStore();
    const currentTheme = themes[currentSeason];

    return (
        <div className="summary-container">
            <div className="summary-content" style={{ backgroundColor: currentTheme.secondary }}>
            </div>
            {(!recommendations || recommendations.length === 0) ? (
                <div>No recommendations available</div>
            ) : (
                recommendations.map((rec, index) => (
                    <button
                        key={index}
                        onClick={() => handleRecommendationClick(rec.Description)}
                        className="recommendation-button"
                        style={{
                            backgroundColor: 'transparent',
                            color: currentTheme.buttonTextColor,
                            border: '5px',
                        }}
                        data-description={rec.Description}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = currentTheme.buttonBackgroundColor;
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        {rec.Title}
                    </button>
                ))
            )}

            {chapterNum < 30 && (
                <div className="user-text-area">
                    <textarea
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="Your Text"
                        className="summary-textarea"
                        style={{ borderColor: currentTheme.textColor }}
                    />
                    <button
                        className="summary-button"
                        onClick={handleUserTextSubmit}
                        style={{
                            backgroundColor: 'transparent',
                            color: currentTheme.buttonTextColor,
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
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};
export default Summary;