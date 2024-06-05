import React, { useState } from 'react';
import './SummaryGenerator.scss';
import useThemeStore from '../../../shared/store/Themestore';
import useBookStore from '../../../shared/store/BookStore';
import axiosInstance from '../../../features/auth/AuthInstance';
import useGlobalStore from '../../../shared/store/GlobalStore';

const SummaryGenerator = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const { prologue, summary, bookId, recommendations, setPrologue, setSummary, language } = useBookStore();
    const [userText, setUserText] = useState('');
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();

    const handleRecommendationClick = async (description) => {
        triggerAnimation();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { summary: description });
            setSummary(response.data.final_summary);
        } catch (err) {
            setError(err);
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserTextSubmit = async () => {
        triggerAnimation();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { summary: userText });
            setSummary(response.data.final_summary);
        } catch (err) {
            setError(err);
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetryClick = async () => {
        triggerAnimation();
        const prompt = `${language}`;
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { language: prompt });
            setPrologue(response.data.prologue);
        } catch (error) {
            setError(error);
            console.error("Error submitting data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextClick = async () => {
        triggerAnimation();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`http://127.0.0.1:8000/api/books/${bookId}/`, { summary: summary });
            setPrologue(response.data.prologue);
        } catch (error) {
            setError(error);
            console.error("Error submitting data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerAnimation = () => {
        const book = document.querySelector('.SummaryGenerator-book');
        if (book) {
            book.classList.add('animate');
            setTimeout(() => {
                book.classList.remove('animate');
            }, 5000); // Duration of the animation
        }
    };

    return (
        <div className="novel-continuation section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="SummaryGenerator-book">
                <div className="SummaryGenerator-page left-page">
                    <p>{isLoading ? 'Loading...' : (prologue || summary || 'Result of Novel')}</p>
                </div>
                <div className="SummaryGenerator-page right-page">
                    {recommendations ? (
                        <>
                            <div className="content">
                                {recommendations.map((rec, index) => (
                                    <button
                                        key={index}
                                        className="recommendation-button"
                                        style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                                        onClick={() => handleRecommendationClick(rec.Description)}
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
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="prologue-area">
                            <p>{prologue}</p>
                        </div>
                    )}
                    {!recommendations && (
                        <div className="action-buttons">
                            <button
                                onClick={handleRetryClick}
                                style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                            >
                                Retry
                            </button>
                            <button
                                onClick={handleNextClick}
                                style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryGenerator;
