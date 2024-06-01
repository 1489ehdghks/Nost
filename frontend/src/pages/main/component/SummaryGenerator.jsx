import React, { useState } from 'react';
import './SummaryGenerator.scss';
import useThemeStore from '../../../shared/store/Themestore';
import useBookStore from '../../../shared/store/BookStore';
import axiosInstance from '../../../features/auth/AuthInstance';
import useGlobalStore from '../../../shared/store/GlobalStore';

const SummaryGenerator = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const { summary, bookId, recommendations, setSummary } = useBookStore();
    const [userText, setUserText] = useState('');
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();

    const handleRecommendationClick = async (description) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { summary: description });
            setSummary(response.data.final_summary);
        } catch (err) {
            setError(err);
            alert(error)
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserTextSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { summary: userText });
            setSummary(response.data.final_summary);
        } catch (err) {
            setError(err);
            alert(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="novel-continuation section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="novel-result">
                <p>{isLoading ? 'Loading...' : (summary || 'Result of Novel')}</p>
            </div>
            <div className="content">
                {recommendations && recommendations.map((rec, index) => (
                    <button
                        key={index}
                        className="recommendation-button"
                        style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                        onClick={() => handleRecommendationClick(rec.Description)}
                        onMouseEnter={(e) => {
                            const tooltip = document.createElement('div');
                            tooltip.className = 'tooltip';
                            tooltip.innerText = rec.Description;
                            e.target.appendChild(tooltip);
                        }}
                        onMouseLeave={(e) => {
                            const tooltip = e.target.querySelector('.tooltip');
                            if (tooltip) {
                                tooltip.remove();
                            }
                        }}
                    >
                        {rec.Title}
                    </button>
                ))}
            </div>
            <div className="user-text-area">
                <textarea
                    placeholder="User Text Area"
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    style={{ backgroundColor: currentTheme.secondary, color: currentTheme.textColor }}
                ></textarea>
                <button
                    onClick={handleUserTextSubmit}
                    style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                >
                    Submit User Text
                </button>
            </div>
        </div>
    );
};

export default SummaryGenerator;
