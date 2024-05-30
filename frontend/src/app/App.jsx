
import './styles/App.scss';
import AppRouter from './Approuter';
import { BrowserRouter } from 'react-router-dom';
import useThemeStore from '../shared/store/Themestore';
import ThemeMode from '../widgets/button/ThemeMode';
import Blossom from '../widgets/events/Blossom';
import Rain from '../widgets/events/Rain';
import FallenLeaves from '../widgets/events/FallenLeaves';
import Snow from '../widgets/events/FallenSnow';
import useGlobalStore from '../shared/store/GlobalStore';
import Loading from '../widgets/events/Loading';


function App() {
  const { themes, currentSeason, setDarkMode, setThemeMode, setSeason } = useThemeStore();
  const { isLoading } = useGlobalStore();
  const currentTheme = themes[currentSeason];

  const getSeasonEffect = () => {
    switch (currentSeason) {
      case 'spring':
        return <Blossom />;
      case 'summer':
        return <Rain />;
      case 'autumn':
        return <FallenLeaves />;
      case 'winter':
        return <Snow />;
      default:
        return null;
    }
  };

  const handleSeasonChange = (season) => {
    setSeason(season);
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
    <>
      {isLoading && <Loading />}
      <div className="App" style={{ backgroundColor: currentTheme.primary, color: currentTheme.textColor }}>
        <div className="theme-toggles">
          <ThemeMode currentSeason={currentSeason} setSeason={handleSeasonChange} />
        </div>
        <div className="background">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
          <div className="season-effect">
            {getSeasonEffect()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;