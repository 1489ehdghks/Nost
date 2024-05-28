import React, { useState, useEffect } from 'react';
import './SynopsysGenerator.scss';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import useBookStore from '../../../shared/store/BookStore';
import useGlobalStore from '../../../shared/store/GlobalStore';
import useThemeStore from '../../../shared/store/Themestore';
import axiosInstance from '../../../features/auth/AuthInstance';
import axios from 'axios';


//프롬프트 끝에 "." 작성하지 마세요.
const genres = [
    { label: '판타지', prompt: 'Fantasy novels often include magic, mythical creatures, and epic quests' },
    { label: '로맨스', prompt: 'Romance novels focus on romantic relationships between characters' },
    { label: '스릴러', prompt: 'Thriller novels are characterized by excitement, suspense, and high stakes' },
    { label: '미스터리', prompt: 'Mystery novels revolve around solving a crime or uncovering secrets.' },
    { label: '공상과학', prompt: 'Science fiction novels explore futuristic concepts, advanced technology, and space exploration' },
    { label: '역사', prompt: 'Historical novels are set in the past and often include real historical events and figures' },
];

const eras = [
    { label: '고대', prompt: 'Ancient era novels are set in ancient times, often featuring historical events and figures' },
    { label: '중세', prompt: 'Medieval era novels are set in the Middle Ages, featuring knights, castles, and feudal societies' },
    { label: '근대', prompt: 'Modern era novels are set in recent history, often exploring industrialization and early modern society' },
    { label: '현대', prompt: 'Contemporary novels are set in the present day, reflecting current societal trends and issues' },
    { label: '미래', prompt: 'Future era novels speculate about future societies, technologies, and events' },
];

const settings = [
    { label: 'Magic', prompt: 'Magic' },
    { label: 'Space Travel', prompt: 'Space Travel' },
    { label: 'Time Travel', prompt: 'Time Travel' },
    { label: 'Alternate Reality', prompt: 'Alternate Reality' },
    { label: 'Post-Apocalyptic', prompt: 'Post-Apocalyptic' },
    { label: 'Supernatural', prompt: 'Supernatural' },
];

const SynopsysGenerator = () => {
    const { synopsis, setSynopsis, setSummary, setRecommendations } = useBookStore();
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    const [additionalDetails, setAdditionalDetails] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedEra, setSelectedEra] = useState('');
    const [showGenres, setShowGenres] = useState(true);
    const [showEras, setShowEras] = useState(true);
    const [showSettings, setShowSettings] = useState(true);
    const [specialSettings, setSpecialSettings] = useState([]);

    useEffect(() => {
        if (synopsis) {
            setAdditionalDetails(synopsis);
        }
    }, [synopsis]);

    const handleDetailsChange = (e) => setAdditionalDetails(e.target.value);

    const handleGenreChange = (prompt) => {
        setSelectedGenres((prev) => prev.includes(prompt) ? prev.filter((g) => g !== prompt) : [...prev, prompt]);
    };

    const handleEraChange = (prompt) => {
        setSelectedEra((prev) => (prev === prompt ? '' : prompt));
    };

    const handleSpecialSettingsChange = (prompt) => {
        setSpecialSettings((prev) => prev.includes(prompt) ? prev.filter((s) => s !== prompt) : [...prev, prompt]);
    };

    const generateSynopsis = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formattedDetails = `
            ${selectedGenres.join(', ')},${selectedEra},${specialSettings.join(', ')},${additionalDetails}
        `;

        const requestData = {
            prompt: formattedDetails.trim(),
        };

        try {
            console.log("requestData:", requestData)
            console.log("prompt:", requestData.prompt)
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/books/', requestData);
            console.log("generateSynopsis_response", response.data)
            setSynopsis(response.data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const submitSummary = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            console.log("additionalDetails222222:", additionalDetails)
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/books/summary/', { summary: additionalDetails });
            setSummary(response.data.final_summary);
            setRecommendations(response.data.recommendations);

            console.log("data.content:", response.data.final_summary)
            console.log("response:", response.data)
            console.log("additionalDetails222222:", additionalDetails)
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonClass = (selected, current) => selected.includes(current) ? 'selected' : '';

    return (
        <div className="novel-generator section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <h1>New Novel</h1>
            <form onSubmit={generateSynopsis} style={{ paddingBottom: '3%' }}>
                <div className="user-inputs">
                    <div className="userSelection">
                        <div className="button-group">
                            <div className="toggle-switch" onClick={() => setShowGenres(!showGenres)}>
                                <h2>Genre</h2>
                                <div>{showGenres ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showGenres && (
                                <div className="buttons">
                                    {genres.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={buttonClass(selectedGenres, prompt)}
                                            onClick={() => handleGenreChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedGenres.includes(prompt) ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
                                                color: currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="button-group">
                            <div className="toggle-switch" onClick={() => setShowEras(!showEras)}>
                                <h2>Era</h2>
                                <div>{showEras ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showEras && (
                                <div className="buttons">
                                    {eras.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={selectedEra === prompt ? 'selected' : ''}
                                            onClick={() => handleEraChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedEra === prompt ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
                                                color: currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="button-group">
                            <div className="toggle-switch" onClick={() => setShowSettings(!showSettings)}>
                                <h2>Special Settings</h2>
                                <div>{showSettings ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showSettings && (
                                <div className="buttons">
                                    {settings.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={buttonClass(specialSettings, prompt)}
                                            onClick={() => handleSpecialSettingsChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: specialSettings.includes(prompt) ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
                                                color: currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="details-container">
                        <textarea
                            placeholder="Result (editable)"
                            value={additionalDetails}
                            onChange={handleDetailsChange}
                            className="styled-textarea"
                            style={{ backgroundColor: currentTheme.secondary, color: currentTheme.textColor }}
                        ></textarea>
                        <div className="button-row">
                            <button type="submit" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                                {isLoading ? 'Generating...' : 'Generate Synopsis'}
                            </button>

                            {additionalDetails && (
                                <button onClick={submitSummary} className="summary-button" type="submit" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                                    Submit Summary
                                </button>
                            )}
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default SynopsysGenerator;
