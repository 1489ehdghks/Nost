import React, { useState } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import LoginModal from '../../widgets/layout/Modal/LoginModal';
import Button from '../../widgets/button/Buttons';


import FallenLeaves from '../../widgets/events/FallenLeaves';
import Rain from '../../widgets/events/Rain';
import Snow from '../../widgets/events/snow';
import Blossom from '../../widgets/events/Blossom';

import './HomePage.scss';



const HomePage = () => {
    const { season } = useThemeStore();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const getSeasonEffect = () => {
        switch (season) {
            case 'spring':
                return <Blossom />;
            case 'summer':
                return <Rain />;
            case 'autumn':
                return <FallenLeaves />;
            case 'winter':
            default:
                return <Snow />;
        }
    };

    return (
        <div className="homePage">
            <div className='content'>
                <h1>Novel Stella</h1>
                <p className="subtitle">
                    empowered by innovative AI to bring your storytelling to life.
                    "Step into a realm where your words shape worlds"
                </p>
                <Button className="shake" onClick={handleOpenModal}>Join</Button>
            </div>

            {isModalOpen && <LoginModal onClose={handleCloseModal} />}
            {getSeasonEffect()}
        </div>
    );
};

export default HomePage;