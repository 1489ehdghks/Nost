import React from 'react';
import { FaLeaf, FaCloudRain, FaRegSnowflake, FaSun } from 'react-icons/fa';
import './styles/ThemeMode.scss';

const ThemeModeToggle = ({ currentSeason, setSeason }) => {

    const handleClick = (season) => {
        setSeason(season);
    };

    return (
        <div className="theme-mode-toggle">
            <button
                className={`season-icon ${currentSeason === 'spring' ? 'active' : ''}`}
                onClick={() => handleClick('spring')}
            >
                <FaSun />
            </button>
            <button
                className={`season-icon ${currentSeason === 'summer' ? 'active' : ''}`}
                onClick={() => handleClick('summer')}
            >
                <FaCloudRain />
            </button>
            <button
                className={`season-icon ${currentSeason === 'autumn' ? 'active' : ''}`}
                onClick={() => handleClick('autumn')}
            >
                <FaLeaf />
            </button>
            <button
                className={`season-icon ${currentSeason === 'winter' ? 'active' : ''}`}
                onClick={() => handleClick('winter')}
            >
                <FaRegSnowflake />
            </button>
        </div>
    );
};
export default ThemeModeToggle;
