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
import krLocale from 'i18n-iso-countries/langs/ko.json';


countries.registerLocale(enLocale);
countries.registerLocale(krLocale);

const countryOptions = Object.entries(countries.getNames("en", { select: "official" })).map(([code, name]) => ({
    label: name,
    value: code
}));


const genres = [
    { label: '판타지', prompt: 'Fantasy novels often include magic, mythical creatures, and epic quests' },
    { label: '로맨스', prompt: 'Romance novels focus on romantic relationships between characters' },
    { label: '스릴러', prompt: 'Thriller novels are characterized by excitement, suspense, and high stakes' },
    { label: '미스터리', prompt: 'Mystery novels revolve around solving a crime or uncovering secrets.' },
    { label: '공상과학', prompt: 'Science fiction novels explore futuristic concepts, advanced technology, and space exploration' },
];

const eras = [
    { label: '고대', prompt: 'Ancient era novels are set in ancient times, often featuring historical events and figures' },
    { label: '중세', prompt: 'Medieval era novels are set in the Middle Ages, featuring knights, castles, and feudal societies' },
    { label: '근대', prompt: 'Modern era novels are set in recent history, often exploring industrialization and early modern society' },
    { label: '현대', prompt: 'Contemporary novels are set in the present day, reflecting current societal trends and issues' },
    { label: '미래', prompt: 'Future era novels speculate about future societies, technologies, and events' },
];

const details = [
    { label: '좀비', prompt: 'zombie apocalypse settings' },
    { label: '인터넷방송', prompt: 'internet broadcasting' },
    { label: '악녀', prompt: 'villainess' },
    { label: '피폐', prompt: 'dark and tragic themes' },
    { label: '성인', prompt: 'adult themes' },
    { label: '사이버펑크', prompt: 'cyberpunk' },
    { label: '미션', prompt: 'missions and quests' },
];

const SynopsysGenerator = ({ onComplete }) => {
    const { setSynopsis, setBookId, setTitle, setGenre, setTheme, setTone, setSetting, setCharacters, setLanguage } = useBookStore();
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();
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

        const formattedDetails = `${selectedGenres.join(', ')},${selectedEra},${selectedDetails.join(', ')}`;

        const requestData = {
            prompt: formattedDetails.trim(),
            userRequests: userRequests.trim(),
            language: selectedCountry ? selectedCountry.value : null
        };

        if (selectedCountry) {
            setLanguage(selectedCountry.value);
        }

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
            onComplete();
        }
    };

    const buttonClass = (selected, current) => selected.includes(current) ? 'selected' : '';


    return (
        <div className="novel-generator section" style={{ fontFamily: font.shapeFont, backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <h1>New Novel</h1>
            <form onSubmit={generateSynopsis}>
                <div className="user-inputs">
                    <div className="button-group">
                        <h2>Language</h2>
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
                        <div className="button-group">
                            <div className="toggle-switch" onClick={() => setShowEras(!showEras)}>
                                <h2 >Era</h2>
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
                                                backgroundColor: currentTheme.buttonBackgroundColor,
                                                color: selectedEra === prompt ? currentTheme.buttonTextColor : currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

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
                                                backgroundColor: currentTheme.buttonBackgroundColor,
                                                color: selectedEra === prompt ? currentTheme.buttonTextColor : currentTheme.buttonTextColor,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="button-group details">
                            <div className="toggle-switch" onClick={() => setShowDetails(!showDetails)}>
                                <h2>Details</h2>
                                <div>{showDetails ? <FaChevronDown /> : <FaChevronRight />}</div>
                            </div>
                            {showDetails && (
                                <div className="buttons">
                                    {details.map(({ label, prompt }) => (
                                        <button
                                            key={label}
                                            type="button"
                                            className={selectedEra === prompt ? 'selected' : ''}
                                            onClick={() => handleDetailChange(prompt)}
                                            data-prompt={prompt}
                                            style={{
                                                backgroundColor: currentTheme.buttonBackgroundColor,
                                                color: selectedEra === prompt ? currentTheme.buttonTextColor : currentTheme.buttonTextColor,
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
                        <h2>Requests</h2>
                        <textarea
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
                    <div className="button-row">
                        <button
                            className="generate-button"
                            type="submit"
                            style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}
                        >
                            <span className="tooltip">Generate a synopsis to base your novel on with the selected values and requests</span>
                            Create Synopsys
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SynopsysGenerator;