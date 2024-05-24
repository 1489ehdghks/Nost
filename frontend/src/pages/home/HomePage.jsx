import React, { useState, useEffect } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import LoginModal from '../../widgets/modal/LoginModal';
import ThemedButton from '../../widgets/button/ThemedButton';
import './HomePage.scss';

const HomePage = () => {
  const { font, themes, currentSeason } = useThemeStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageStack, setImageStack] = useState([{ src: themes[currentSeason].lowRes, loaded: false }]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const lowResImage = themes[currentSeason].lowRes;
    const highResImage = themes[currentSeason].highRes;

    setImageStack([{ src: lowResImage, loaded: false }]);

    const highQualityImg = new Image();
    highQualityImg.src = highResImage;
    highQualityImg.onload = () => {
      setImageStack((prevImages) => [...prevImages, { src: highResImage, loaded: true }]);
    };

    return () => {
      setImageStack((prevImages) => prevImages.filter((image) => image.src === highResImage));
    };
  }, [currentSeason, themes]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const currentTheme = themes[currentSeason];


  return (
    <div className="homePage">
      <div className="content" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', padding: '40px 60px', borderRadius: '10px', backdropFilter: 'blur(1px)' }}>
        <h1 style={{ color: currentTheme.additionalColors[0], textShadow: currentTheme.neonEffect.titleTextShadow, fontFamily: font.nomalFont, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Novel Stella</h1>
        <p className="subtitle" style={{ color: currentTheme.additionalColors[3], fontFamily: font.nomalFont, fontSize: '1.2rem', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
          {currentTheme.subtitle}
        </p>
        <ThemedButton onClick={handleOpenModal} style={{ color: currentTheme.buttonTextColor, padding: '10px 20px', borderRadius: '5px', border: 'none', textTransform: 'uppercase', marginBottom: '20px' }}>
          Join
        </ThemedButton>
        <h3 className="Team" style={{ color: currentTheme.teamColor, fontFamily: font.rockFont, position: 'absolute', bottom: '10px', right: '20px', letterSpacing: '2px' }}>- Team NOST</h3>
      </div>
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      <div className="background">
        {imageStack.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt="Season"
            className={`image ${image.loaded ? 'high-quality loaded' : 'low-quality'}`}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;