import React, { useState, useEffect } from 'react';
import useBookStore from '../../../shared/store/BookStore';
import useThemeStore from '../../../shared/store/Themestore';
import useGlobalStore from '../../../shared/store/GlobalStore';
import './SynopsysResult.scss';
import axiosInstance from '../../../features/auth/AuthInstance';

const SynopsysResult = ({ onComplete }) => {
    const { title, genre, theme, tone, setting, characters, bookId, language, setPrologue, setTranslatedPrologue, setChapterNum, setBookId } = useBookStore();
    const { font, themes, currentSeason } = useThemeStore();
    const { setIsLoading } = useGlobalStore()
    const Seasontheme = themes[currentSeason];

    const [currentPage, setCurrentPage] = useState(1);
    const [editableTitle, setEditableTitle] = useState(title);
    const [editableGenre, setEditableGenre] = useState(genre);
    const [editableTheme, setEditableTheme] = useState(theme);
    const [editableTone, setEditableTone] = useState(tone);
    const [editableSetting, setEditableSetting] = useState(setting);
    const [editableCharacters, setEditableCharacters] = useState(characters);



    useEffect(() => {
        setEditableTitle(title);
        setEditableGenre(genre);
        setEditableTheme(theme);
        setEditableTone(tone);
        setEditableSetting(setting);
        setEditableCharacters(characters);
    }, [title, genre, theme, tone, setting, characters]);





    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);

    const handleComplete = async () => {
        setIsLoading(true);
        const prompt = `Recommend the best prologue for me.Title is '${editableTitle}' Genre is '${editableGenre}' Theme is '${editableTheme}' Tone is '${editableTone}' Setting is '${editableSetting}' Characters is '${editableCharacters}'`;

        try {
            await axiosInstance.delete(`https://nost-stella.com/api/books/${bookId}/del_prol/`);
            const response = await axiosInstance.post(`https://nost-stella.com/api/books/${bookId}/`, { summary: prompt, language: language.value });
            setBookId(response.data.book_id)
            setChapterNum(response.data.chapter_num)
            setPrologue(response.data.prologue);
            setTranslatedPrologue(response.data.translated_content)
            onComplete();
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="section">
            {currentPage === 1 && (
                <div className="SynopsysResult-letter animate-fade-in" style={{ width: "50vw" }}>
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Title:</strong>
                        <textarea style={{ fontFamily: font.nomalFont, height: "3vh" }} value={editableTitle || ''} onChange={(e) => setEditableTitle(e.target.value)} />
                    </div>
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Genre:</strong>
                        <textarea style={{ fontFamily: font.nomalFont, height: "3vh" }} value={editableGenre || ''} onChange={(e) => setEditableGenre(e.target.value)} />
                    </div>
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Theme:</strong>
                        <textarea style={{ fontFamily: font.nomalFont, height: "3vh" }} value={editableTheme || ''} onChange={(e) => setEditableTheme(e.target.value)} />
                    </div>
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Tone:</strong>
                        <textarea style={{ fontFamily: font.nomalFont, height: "3vh" }} value={editableTone || ''} onChange={(e) => setEditableTone(e.target.value)} />
                    </div>
                    <div className="button-group first-page">
                        <button
                            className="never-button"
                            aria-hidden="true"
                            style={{ visibility: 'hidden' }}
                        >
                            Invisible
                        </button>
                        <button
                            style={{ fontFamily: font.shapeFont }}
                            className="next-button"
                            onClick={handleNextPage}
                            onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'tooltip';
                                tooltip.innerText = '수정할 내용이 없다면 next 버튼을 눌러 다음을 진행하세요.';
                                e.target.appendChild(tooltip);
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.target.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.remove();
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {currentPage === 2 && (
                <div className="SynopsysResult-letter animate-fade-in" style={{ width: "50vw" }}>
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Setting:</strong>
                        <textarea
                            style={{ fontFamily: font.nomalFont, height: "40vh" }}
                            value={editableSetting || ''}
                            onChange={(e) => setEditableSetting(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <button
                            style={{ fontFamily: font.shapeFont }}
                            className="prev-button"
                            onClick={handlePrevPage}
                            onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'tooltip';
                                tooltip.innerText = '이전 내용을 수정하려면 Previous을 클릭하세요.';
                                e.target.appendChild(tooltip);
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.target.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.remove();
                                }
                            }}
                        >
                            Previous
                        </button>
                        <button
                            style={{ fontFamily: font.shapeFont }}
                            className="next-button"
                            onClick={handleNextPage}
                            onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'tooltip';
                                tooltip.innerText = '수정할 내용이 없다면 next 버튼을 눌러 다음을 진행하세요.';
                                e.target.appendChild(tooltip);
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.target.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.remove();
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {currentPage === 3 && (
                <div className="SynopsysResult-letter animate-fade-in">
                    <div className="editable-field">
                        <strong style={{ fontFamily: font.shapeFont, color: Seasontheme.textColor }}>Characters:</strong>
                        <textarea
                            style={{ fontFamily: font.nomalFont, height: "80vh" }}
                            value={editableCharacters.replace(/\.\.\./g, '\n\n') || ''}
                            onChange={(e) => setEditableCharacters(e.target.value)}
                            rows="10"
                        />
                    </div>
                    <div className="button-group">
                        <button
                            style={{ fontFamily: font.shapeFont }}
                            className="prev-button"
                            onClick={handlePrevPage}
                            onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'tooltip';
                                tooltip.innerText = '이전 내용을 수정하려면 Previous을 클릭하세요.';
                                e.target.appendChild(tooltip);
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.target.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.remove();
                                }
                            }}
                        >
                            Previous
                        </button>
                        <button
                            style={{ fontFamily: font.shapeFont }}
                            className="complete-button"
                            onClick={handleComplete}
                            onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'tooltip';
                                tooltip.innerText = '작성한 내용에 따라 소설이 생성됩니다.';
                                e.target.appendChild(tooltip);
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.target.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.remove();
                                }
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynopsysResult;
