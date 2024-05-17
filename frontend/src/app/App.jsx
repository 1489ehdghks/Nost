
import './styles/App.scss';
import { useState, useEffect } from 'react';
import AppRouter from './Approuter';
import { BrowserRouter } from 'react-router-dom';
import useThemeStore from '../shared/store/Themestore';
import ThemeMode from '../widgets/button/ThemeMode';
import spring from '../shared/asset/image/spring.avif'
import summer from '../shared/asset/image/summer.jpg'
import autumn from '../shared/asset/image/autumn.avif'
import winter from '../shared/asset/image/winter.avif'
import springLow from '../shared/asset/image/spring_low.jpg'
import summerLow from '../shared/asset/image/summer_low.jpg'
import autumeLow from '../shared/asset/image/autumn_low.jpg'
import winterLow from '../shared/asset/image/winter_low.jpg'



function App() {
  const { themes, setDarkMode, setThemeMode } = useThemeStore();
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [imageStack, setImageStack] = useState([]);


  const currentTheme = themes[currentSeason];


  const seasonImage = {
    spring: spring,
    summer: summer,
    autumn: autumn,
    winter: winter
  };

  const seasonLowImage = {
    spring: springLow,
    summer: summerLow,
    autumn: autumeLow,
    winter: winterLow,
  };

  useEffect(() => {
    const highQualityImg = new Image();
    highQualityImg.src = seasonImage[currentSeason];
    highQualityImg.onload = () => {
      setImageStack([{ src: seasonImage[currentSeason], loaded: true }]);
    };

    setImageStack([{ src: seasonLowImage[currentSeason], loaded: false }]);
  }, [currentSeason]);

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
      <div className="background">
        <div className="image-container">
          {imageStack.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt="Season"
              className={`image ${image.loaded ? 'low-quality' : 'high-quality'}`}
            />
          ))}
        </div>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
