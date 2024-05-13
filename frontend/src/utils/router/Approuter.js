// /src/app/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import MainPage from '../../pages/main/MainPage.Jsx';


const AppRouter = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />

    </Routes>
);

export default AppRouter;
