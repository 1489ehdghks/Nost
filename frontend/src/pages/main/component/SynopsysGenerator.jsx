import React, { useState } from 'react';
import './SynopsysGenerator.scss';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import useBookStore from '../../../shared/store/BookStore';
import useGlobalStore from '../../../shared/store/GlobalStore';
import useThemeStore from '../../../shared/store/Themestore';
import axiosInstance from '../../../features/auth/AuthInstance';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

const customCountryCodeMapping = {
    KO: 'KO',
    US: 'EN-US',
    GB: 'EN-GB',
    JP: 'JA',
    CN: 'ZH'
};

const customCountryNames = {
    KO: 'Korean',
    US: 'English-US',
    GB: 'English-UK',
    JP: 'Japanese',
    CN: 'Chinese'
};

const countryOptions = Object.entries(countries.getNames("en", { select: "official" }))
    .filter(([code]) => customCountryCodeMapping[code])
    .map(([code, name]) => ({
        label: customCountryNames[code],
        value: customCountryCodeMapping[code]
    }));

const genres = [
    { label: '판타지', prompt: 'Fantasy novels often include various mythical creatures and races, focusing on their interactions and conflicts.' },
    { label: '로맨스', prompt: 'Romance novels delve into the complexities of romantic relationships, exploring emotional bonds and personal growth.' },
    { label: '스릴러', prompt: 'Thriller novels are characterized by high-stakes, fast-paced narratives that keep readers on the edge of their seats.' },
    { label: '미스터리', prompt: 'Mystery novels focus on solving crimes or uncovering secrets, often featuring a detective or amateur sleuth.' },
    { label: '공상과학', prompt: 'Science fiction novels explore futuristic concepts, advanced technology, and space exploration.' },
    { label: '공포', prompt: 'Horror novels aim to frighten and unsettle readers with terrifying and supernatural elements.' },
    { label: '디스토피아', prompt: 'Dystopian novels depict grim, oppressive societies often set in the future.' },
    { label: '소년만화', prompt: 'Shonen manga focuses on action, adventure, and coming-of-age stories often targeting young male audiences.' },
];

const eras = [
    { label: '고대', prompt: 'Ancient era novels are set in ancient times, often featuring historical events and figures' },
    { label: '중세', prompt: 'Medieval era novels are set in the Middle Ages, featuring knights, castles, and feudal societies' },
    { label: '근대', prompt: 'Modern era novels are set in recent history, often exploring industrialization and early modern society' },
    { label: '현대', prompt: 'Contemporary novels are set in the present day, reflecting current societal trends and issues' },
    { label: '미래', prompt: 'Future era novels speculate about future societies, technologies, and events' },
];

const details = [
    { label: '디테일한 세계관', prompt: 'Novels with detailed world-building immerse readers in meticulously crafted settings with historically accurate details and subtle foreshadowing.' },
    { label: '심리적', prompt: 'Psychological novels explore the inner workings of characters’ minds, focusing on their thoughts, feelings, and mental states.' },
    { label: '감정적', prompt: 'Emotional novels center on intense personal experiences and the emotional journeys of characters, often highlighting their vulnerabilities and growth.' },
    { label: '철학적', prompt: 'Philosophical novels delve into deep, abstract themes, questioning the nature of reality, existence, and morality.' },
    { label: '사회적', prompt: 'Social novels examine societal issues and themes, often focusing on class, race, and cultural dynamics.' },
    { label: '문화적', prompt: 'Cultural novels highlight specific cultural settings and practices, providing insight into diverse ways of life and traditions.' },
    { label: '현실적', prompt: 'Realistic novels strive for authenticity and plausibility, depicting everyday life and believable scenarios.' },
    { label: '어두운', prompt: 'Dark novels explore sinister and gloomy themes, often set in bleak and dystopian environments.' },
    { label: '성인', prompt: 'Adult novels contain mature themes and explicit content, catering to an audience looking for intense and provocative stories.' },
];

const SynopsysGenerator = ({ onComplete }) => {
    const { setSynopsis, setBookId, setTitle, setGenre, setTheme, setTone, setSetting, setCharacters, setLanguage } = useBookStore();
    const { setIsLoading, setError } = useGlobalStore();
    const { font, themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedEra, setSelectedEra] = useState('');
    const [selectedDetails, setSelectedDetails] = useState([]);
    const [userRequests, setUserRequests] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showGenres, setShowGenres] = useState(true);
    const [showEras, setShowEras] = useState(true);
    const [showDetails, setShowDetails] = useState(true);

    const handleGenreChange = (prompt) => {
        setSelectedGenres((prev) => prev.includes(prompt) ? prev.filter((g) => g !== prompt) : [...prev, prompt]);
    };

    const handleEraChange = (prompt) => {
        setSelectedEra((prev) => (prev === prompt ? '' : prompt));
    };

    const handleDetailChange = (prompt) => {
        setSelectedDetails((prev) => prev.includes(prompt) ? prev.filter((s) => s !== prompt) : [...prev, prompt]);
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    const generateSynopsis = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!selectedCountry) {
            alert('Please select language.');
            setIsLoading(false);
            return;
        }

        setLanguage(selectedCountry);
        const formattedDetails = `The time period setting is ${selectedEra}. The genre is ${selectedGenres.join(', ')} with ${selectedDetails.join(', ')}. ${userRequests}`;
        const requestData = {
            prompt: formattedDetails.trim(),
            language: selectedCountry ? selectedCountry.value : null
        };
        const fetchSynopsis = async (retries = 0) => {
            try {
                const response = await axiosInstance.post('https://nost-stella.com/api/books/', requestData);
                const content = response.data.content;
                if (content.characters && !['문자 없음', '', '登場人物なし', '无字符', 'No Characters'].includes(content.characters)) {
                    setBookId(response.data.book_id);
                    setSynopsis(content.synopsis);
                    setTitle(content.title);
                    setGenre(content.genre);
                    setTheme(content.theme);
                    setTone(content.tone);
                    setSetting(content.setting);
                    setCharacters(content.characters);
                    setIsLoading(false);
                    onComplete();
                } else {
                    throw new Error('설정 저장 문제');
                }
            } catch (err) {
                console.error("Error in fetchSynopsis:", err);
                if (retries < 2) {
                    alert("캐릭터 설정에 문제가 생겨 다시 시도합니다.");
                    fetchSynopsis(retries + 1);
                } else {
                    alert('다시 시도해주세요');
                    setIsLoading(false);
                    setError(err);
                }
            }
        };

        fetchSynopsis();
    };

    const buttonClass = (selected, current) => selected.includes(current) ? 'selected' : '';

    return (
        <div className="novel-generator section" style={{ fontFamily: font.shapeFont, backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <h1 className="synopsis-heading">New Novel</h1>
            <form onSubmit={generateSynopsis}>
                <div className="user-inputs">
                    <div className="synopsis-button-group">
                        <h2 className="synopsis-h2">Language</h2>
                        <Select
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            placeholder="Select a language..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: currentTheme.inputBackgroundColor,
                                    color: currentTheme.textColor,
                                    fontFamily: font.nomalFont,
                                    zIndex: 10,
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    fontFamily: font.nomalFont,
                                    color: currentTheme.textColor,
                                    zIndex: 10,
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: currentTheme.textColor,

                                }),
                            }}
                        />
                    </div>
                    <div className="category">

                        <div className="synopsis-button-group">
                            <div className="toggle-switch" onClick={() => setShowEras(!showEras)}>
                                <h2 className="synopsis-h2">Era</h2>
                                <div className="toggle-icon">{showEras ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showEras && (
                                <div className="buttons">
                                    {eras.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={`synopsis-button ${selectedEra === prompt ? 'selected' : ''}`}
                                            onClick={() => handleEraChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedEra === prompt ? currentTheme.additionalColors[1] : currentTheme.buttonBackgroundColor,
                                                borderColor: currentTheme.additionalColors[1],
                                                color: selectedEra === prompt ? 'white' : currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="synopsis-button-group">
                            <div className="toggle-switch" onClick={() => setShowGenres(!showGenres)}>
                                <h2 className="synopsis-h2">Genre</h2>
                                <div className="toggle-icon">{showGenres ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showGenres && (
                                <div className="buttons">
                                    {genres.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={`synopsis-button ${buttonClass(selectedGenres, prompt)}`}
                                            onClick={() => handleGenreChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedGenres.includes(prompt) ? currentTheme.additionalColors[1] : currentTheme.buttonBackgroundColor,
                                                borderColor: currentTheme.additionalColors[1],
                                                color: selectedGenres.includes(prompt) ? 'white' : currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="synopsis-button-group details">
                            <div className="toggle-switch" onClick={() => setShowDetails(!showDetails)}>
                                <h2 className="synopsis-h2">Details</h2>
                                <div className="toggle-icon">{showDetails ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showDetails && (
                                <div className="buttons">
                                    {details.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={`synopsis-button ${buttonClass(selectedDetails, prompt)}`}
                                            onClick={() => handleDetailChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: selectedDetails.includes(prompt) ? currentTheme.additionalColors[1] : currentTheme.buttonBackgroundColor,
                                                borderColor: currentTheme.additionalColors[1],
                                                color: selectedDetails.includes(prompt) ? 'white' : currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="user-requests">
                        <h2 className="synopsis-h2">Requests</h2>
                        <textarea
                            className="synopsis-textarea"
                            placeholder="User requests here..."
                            rows="4"
                            value={userRequests}
                            onChange={(e) => setUserRequests(e.target.value)}
                            style={{
                                backgroundColor: currentTheme.inputBackgroundColor,
                                color: currentTheme.textColor
                            }}
                        ></textarea>
                    </div>
                    <div className="synopsis-button-row">
                        <button
                            className="synopsis-button generate-button"
                            type="submit"
                            style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                        >
                            <span className="tooltip">Generate a synopsis to base your novel on with the selected values and requests</span>
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SynopsysGenerator;
