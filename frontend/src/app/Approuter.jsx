import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MainPage from '../pages/main/MainPage';
import useAuthStore from '../shared/store/AuthStore';

const AppRouter = () => {
    const { isLoggedIn } = useAuthStore();

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <HomePage />} />
            <Route path="/main" element={<MainPage />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;