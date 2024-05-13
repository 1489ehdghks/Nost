import React, { useState } from 'react';
import LoginModal from '../widgets/LoginModal';
import Button from '../widgets/Buttons';
import Snow from 'widgets/fallingEvents/Snow';
import Blossom from 'widgets/fallingEvents/Blossom';

import './HomePage.scss';

const HomePage = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

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
            <Snow />
        </div>
    );
};

export default HomePage;