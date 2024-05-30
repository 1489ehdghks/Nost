import React, { useState, useEffect } from 'react';
import './SynopsysGenerator.scss';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import useBookStore from '../../../shared/store/BookStore';
import useGlobalStore from '../../../shared/store/GlobalStore';
import useThemeStore from '../../../shared/store/Themestore';
import axiosInstance from '../../../features/auth/AuthInstance';


//프롬프트 끝에 "." 작성하지 마세요.
const genres = [
    { label: '판타지', prompt: 'Fantasy novels often include magic, mythical creatures, and epic quests' },
    { label: '로맨스', prompt: 'Romance novels focus on romantic relationships between characters' },
    { label: '스릴러', prompt: 'Thriller novels are characterized by excitement, suspense, and high stakes' },
    { label: '미스터리', prompt: 'Mystery novels revolve around solving a crime or uncovering secrets.' },
    { label: '공상과학', prompt: 'Science fiction novels explore futuristic concepts, advanced technology, and space exploration' },
    { label: '역사', prompt: 'Historical novels are set in the past and often include real historical events and figures' },
    { label: '드라마', prompt: 'Drama novels explore realistic characters and emotional themes' },
    { label: '액션', prompt: 'Action novels are characterized by fast-paced sequences and physical feats' },
    { label: '모험', prompt: 'Adventure novels often involve a quest or journey with exciting experiences' },
    { label: '코미디', prompt: 'Comedy novels focus on humor and entertaining situations' },
    { label: '미션', prompt: 'Mission novels involve characters undertaking specific tasks or goals' },
    { label: '게임', prompt: 'Game novels are centered around video games or game-like scenarios' },
    { label: '헌터', prompt: 'Hunter novels involve characters who hunt monsters or criminals' },
    { label: '성좌', prompt: 'Constellation novels feature characters related to stars or celestial themes' },
    { label: '무협', prompt: 'Martial arts novels focus on martial arts, usually in an Eastern setting' },
    { label: '아포칼립스', prompt: 'Apocalypse novels deal with end-of-the-world scenarios' },
    { label: '회귀', prompt: 'Regression novels involve characters who go back in time to relive events' },
    { label: '공포', prompt: 'Horror novels are designed to scare and unsettle the reader' },
    { label: '일상', prompt: 'Slice of life novels depict ordinary life events and relationships' },
];

const genresDetail = [
    { label: '좀비', prompt: 'Zombie novels feature the undead, usually as antagonists' },
    { label: '인터넷방송', prompt: 'Internet broadcasting novels involve characters who stream or create online content' },
    { label: '기업', prompt: 'Corporate novels focus on business and corporate environments' },
    { label: '직업', prompt: 'Career novels explore the professional lives and careers of characters' },
    { label: '연예계', prompt: 'Entertainment industry novels center around celebrities and showbiz' },
    { label: '악녀', prompt: 'Villainess novels feature female antagonists or morally grey characters' },
    { label: '피폐', prompt: 'Dark novels focus on themes of despair and suffering' },
    { label: '육아', prompt: 'Parenting novels explore the challenges and joys of raising children' },
    { label: '성인', prompt: 'Adult novels feature mature themes and content' },
    { label: '사이버펑크', prompt: 'Cyberpunk novels depict futuristic, dystopian worlds dominated by technology' },
];

const eras = [
    { label: '고대', prompt: 'Ancient era novels are set in ancient times, often featuring historical events and figures' },
    { label: '중세', prompt: 'Medieval era novels are set in the Middle Ages, featuring knights, castles, and feudal societies' },
    { label: '근대', prompt: 'Modern era novels are set in recent history, often exploring industrialization and early modern society' },
    { label: '현대', prompt: 'Contemporary novels are set in the present day, reflecting current societal trends and issues' },
    { label: '미래', prompt: 'Future era novels speculate about future societies, technologies, and events' },
];



const SynopsysGenerator = () => {
    const { setSynopsis, setBookId, setTitle, setGenre, setTheme, setTone, setSetting, setCharacters } = useBookStore();
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedEra, setSelectedEra] = useState('');
    const [showGenres, setShowGenres] = useState(true);
    const [showEras, setShowEras] = useState(true);
    const [showSettings, setShowSettings] = useState(true);
    const [specialSettings, setSpecialSettings] = useState([]);

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
            ${selectedGenres.join(', ')},${selectedEra},${specialSettings.join(', ')}
        `;

        const requestData = {
            prompt: formattedDetails.trim(),
        };

        try {
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/books/', requestData);
            setBookId(response.data.book_id);
            setSynopsis(response.data.content.synopsis);
            setTitle(response.data.content.title);
            setGenre(response.data.content.genre);
            setTheme(response.data.content.theme);
            setTone(response.data.content.tone);
            setSetting(response.data.content.setting);
            setCharacters(response.data.content.characters);
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
                                    {genresDetail.map(({ label, prompt }) => (
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
                    <div className="button-row">
                        <button className="generate-button" type="submit" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                            {isLoading ? 'Generating...' : 'Generate Synopsis'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SynopsysGenerator;