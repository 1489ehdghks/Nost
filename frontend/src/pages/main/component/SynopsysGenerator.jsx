import React, { useState, useEffect } from 'react';
import './SynopsysGenerator.scss';
import { FaBook, FaClock, FaCogs, FaChevronDown, FaChevronUp, FaChevronRight } from 'react-icons/fa';
import useBookStore from '../../../shared/store/BookStore';
import useGlobalStore from '../../../shared/store/GlobalStore';
import useThemeStore from '../../../shared/store/Themestore';
import axios from 'axios';

const SynopsysGenerator = () => {
    const { synopsis, setSynopsis } = useBookStore();
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];

    const [additionalDetails, setAdditionalDetails] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedEra, setSelectedEra] = useState('');
    const [showGenres, setShowGenres] = useState(false);
    const [showEras, setShowEras] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [specialSettings, setSpecialSettings] = useState([]);

    useEffect(() => {
        if (synopsis) {
            setAdditionalDetails(synopsis);
        }
    }, [synopsis]);

    const handleDetailsChange = (e) => setAdditionalDetails(e.target.value);

    const handleGenreChange = (genre) => {
        setSelectedGenres((prev) => prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]);
    };

    const handleEraChange = (era) => setSelectedEra(era);

    const handleSpecialSettingsChange = (setting) => {
        setSpecialSettings((prev) => prev.includes(setting) ? prev.filter((s) => s !== setting) : [...prev, setting]);
    };

    const generateSynopsis = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/books/synopsys/', {
                genres: selectedGenres,
                era: selectedEra,
                details: additionalDetails,
                settings: specialSettings,
            });
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
            await axios.post('http://127.0.0.1:8000/api/books/summary/', { synopsis: additionalDetails });
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
            <form onSubmit={generateSynopsis}>
                <div className="user-inputs">
                    <div className="userSelection">
                        <div className="button-group">
                            <div className="toggle-switch" onClick={() => setShowGenres(!showGenres)}>
                                <Title>Genre</Title>
                                <div>{showGenres ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showGenres && (
                                <div className="buttons">
                                    {[
                                        { label: '판타지', prompt: 'Fantasy novels often include magic, mythical creatures, and epic quests.' },
                                        { label: '로맨스', prompt: 'Romance novels focus on romantic relationships between characters.' },
                                        { label: '스릴러', prompt: 'Thriller novels are characterized by excitement, suspense, and high stakes.' },
                                        { label: '미스터리', prompt: 'Mystery novels revolve around solving a crime or uncovering secrets.' },
                                        { label: '공상과학', prompt: 'Science fiction novels explore futuristic concepts, advanced technology, and space exploration.' },
                                        { label: '역사', prompt: 'Historical novels are set in the past and often include real historical events and figures.' },
                                    ].map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={buttonClass(selectedGenres, label)}
                                            onClick={() => handleGenreChange(label)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedGenres.includes(label) ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
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
                                <Title>Era</Title>
                                <div>{showEras ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showEras && (
                                <div className="buttons">
                                    {[
                                        { label: '고대', prompt: 'Ancient era novels are set in ancient times, often featuring historical events and figures.' },
                                        { label: '중세', prompt: 'Medieval era novels are set in the Middle Ages, featuring knights, castles, and feudal societies.' },
                                        { label: '근대', prompt: 'Modern era novels are set in recent history, often exploring industrialization and early modern society.' },
                                        { label: '현대', prompt: 'Contemporary novels are set in the present day, reflecting current societal trends and issues.' },
                                        { label: '미래', prompt: 'Future era novels speculate about future societies, technologies, and events.' },
                                    ].map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={selectedEra === label ? 'selected' : ''}
                                            onClick={() => handleEraChange(label)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedEra === label ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
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
                                <Title>Special Settings</Title>
                                <div>{showSettings ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showSettings && (
                                <div className="buttons">
                                    {[
                                        'Magic', 'Space Travel', 'Time Travel', 'Alternate Reality', 'Post-Apocalyptic', 'Supernatural'
                                    ].map((setting) => (
                                        <button
                                            key={setting}
                                            type="button"
                                            className={buttonClass(specialSettings, setting)}
                                            onClick={() => handleSpecialSettingsChange(setting)}
                                            style={{
                                                backgroundColor: specialSettings.includes(setting) ? currentTheme.buttonSelectedBackgroundColor : currentTheme.buttonBackgroundColor,
                                                color: currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {setting}
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
const Title = ({ children }) => <h2>{children}</h2>;

export default SynopsysGenerator;
