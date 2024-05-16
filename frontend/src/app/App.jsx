
import './styles/App.scss';
import { useState } from 'react';
import AppRouter from './Approuter';
import { BrowserRouter } from 'react-router-dom';
import useThemeStore from '../features/theme/store/Themestore';
import ThemeMode from '../widgets/button/ThemeMode';

function App() {
  const { themes, setDarkMode, setThemeMode } = useThemeStore();

  const [currentSeason, setCurrentSeason] = useState('spring');

  const currentTheme = themes[currentSeason];

  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
    if (season === 'winter' || season === 'summer') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    if (season === 'autumn' || season === 'winter') {
      setThemeMode(true);
    } else {
      setThemeMode(false);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: currentTheme.primary, color: currentTheme.textColor }}>
      <div className="theme-toggles">
        <ThemeMode currentSeason={currentSeason} setSeason={handleSeasonChange} />
      </div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
