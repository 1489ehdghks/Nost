// /src/app/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainPage from '../pages/mainPage';


const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
    </Routes>
);

export default AppRouter;
