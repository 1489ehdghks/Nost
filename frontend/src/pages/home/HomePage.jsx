import React, { useState } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import LoginModal from '../../widgets/modal/LoginModal';
import ThemedButton from '../../widgets/button/ThemedButton';
import Blossom from '../../widgets/events/Blossom';
import Rain from '../../widgets/events/Rain';
import FallenLeaves from '../../widgets/events/FallenLeaves';
import Snow from '../../widgets/events/FallenSnow';
import './HomePage.scss';



const HomePage = () => {
  const { themes, isThemeMode, isDarkMode } = useThemeStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const getCurrentTheme = () => {
    if (isDarkMode && isThemeMode) {
      return themes.winter;
    } else if (isDarkMode && !isThemeMode) {
      return themes.summer;
    } else if (!isDarkMode && isThemeMode) {
      return themes.autumn;
    } else {
      return themes.spring;
    }
  };

  const currentTheme = getCurrentTheme();
  const backgroundImage = currentTheme.backgroundImage;

  const getSeasonEffect = () => {
    switch (currentTheme) {
      case themes.spring:
        return <Blossom />;
      case themes.summer:
        return <Rain />;
      case themes.autumn:
        return <FallenLeaves />;
      case themes.winter:
      default:
        return <Snow />;
    }
  };

  return (
    <div className="homePage" style={{ backgroundImage }}>
      <div className='content'>
        <h1>Novel Stella</h1>
        <p className="subtitle" style={{ color: currentTheme.textColor }}>
          empowered by innovative AI to bring your storytelling to life.
          "Step into a realm where your words shape worlds"
        </p>
        <ThemedButton className="shake" onClick={handleOpenModal}>Join</ThemedButton>
      </div>

      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      {getSeasonEffect()}
    </div>
  );
};
export default HomePage;