import React, { useState } from 'react';
import './SummaryGenerator.scss';
import useThemeStore from '../../../shared/store/Themestore';
import useBookStore from '../../../shared/store/BookStore';
import axiosInstance from '../../../features/auth/AuthInstance';
import useGlobalStore from '../../../shared/store/GlobalStore';
import Prologue from './summaryGeneratorComponent/Prologue';
import Summary from './summaryGeneratorComponent/Summary';

const SummaryGenerator = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const { prologue, chapterNum, translatedPrologue, translatedContent, summary, bookId, language, recommendations, setBookId, setChapterNum, setPrologue, setSummary, setTranslatedPrologue, setTranslatedContent, setRecommendations } = useBookStore();
    const [userText, setUserText] = useState('');
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();

    const handleRetryClick = async () => {
        triggerAnimation();
        setIsLoading(true);
        const prompt = `Please write a prologue that matches the content..${prologue}`;

        try {
            await axiosInstance.delete(`http://15.165.15.170/api/books/${bookId}/del_prol/`);
            const response = await axiosInstance.post(`http://15.165.15.170/api/books/${bookId}/`, { summary: prompt, language: language.value });
            console.log("response:", response);
            setPrologue(response.data.prologue);
            setTranslatedPrologue(response.data.translated_content);
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
        const prompt = `Please write a scean that matches the content.${prologue}`;
        try {
            const response = await axiosInstance.post(`http://15.165.15.170/api/books/${bookId}/`, { summary: prompt, language: language.value });
            console.log("NextResponse:", response.data);
            setPrologue(response.data.prologue)
            setChapterNum(response.data.chapter_num);
            setTranslatedContent(response.data.translated_content)
            setBookId(response.data.book_id)
            setRecommendations(response.data.recommendations)
            console.log("chapterNum:", chapterNum)
        } catch (error) {
            setError(error);
            console.error("Error submitting data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecommendationClick = async (description) => {
        triggerAnimation();
        setIsLoading(true);
        console.log("description:", description)
        const prompt = `Please write a scean that matches the content.${description}`
        try {
            const response = await axiosInstance.post(`http://15.165.15.170/api/books/${bookId}/`, { summary: prompt, language: language.value });
            console.log("RecommendationResponse:", response.data);
            setSummary(response.data.final_summary);
            setTranslatedContent(response.data.translated_content)
            setBookId(response.data.book_id)
            setChapterNum(response.data.chapter_num);
            setRecommendations(response.data.recommendations)
            console.log("recommendations:", recommendations)
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
            const response = await axiosInstance.post(`http://15.165.15.170/api/books/${bookId}/`, { summary: userText, language: language.value });
            console.log("TextSubmitResponse:", response.data);
            setSummary(response.data.final_summary);
            setTranslatedContent(response.data.translated_content)
            setBookId(response.data.book_id)
            setChapterNum(response.data.chapter_num);
            setRecommendations(response.data.recommendations)
            console.log("translatedContent", translatedContent)
        } catch (err) {
            setError(err);
            alert(error);
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
            }, 5000);
        }
    };

    return (
        <div className="novel-continuation section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            {chapterNum === 0 ? (
                <div className="SummaryGenerator-fullpage">
                    <Prologue
                        prologue={prologue}
                        translatedPrologue={translatedPrologue}
                        setTranslatedPrologue={setTranslatedPrologue}
                        handleRetryClick={handleRetryClick}
                        handleNextClick={handleNextClick}
                    />
                </div>
            ) : (
                <div className="SummaryGenerator-book">
                    <div className="SummaryGenerator-page left-page">
                        <textarea
                            value={translatedContent || ''}
                            readOnly
                            className="summary-textarea"
                        />
                    </div>
                    <div className="SummaryGenerator-page right-page">
                        <Summary
                            recommendations={recommendations}
                            handleRecommendationClick={handleRecommendationClick}
                            userText={userText}
                            setUserText={setUserText}
                            handleUserTextSubmit={handleUserTextSubmit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummaryGenerator;
