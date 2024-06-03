import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MainPage from '../pages/main/MainPage';
import useAuthStore from '../shared/store/AuthStore';
import Profile from '../pages/profile/Profile';
import Mybooklist from '../pages/mybooks/Mybooklist';
import BookDetail from '../widgets/book/BookDetail';
import SideLayout from '../widgets/layout/sideLayout/SideLayout';
import SettingsPage from '../pages/settings/SettingsPage'
import NotFound from '../pages/NotFound';

const AppRouter = () => {
    const { isLoggedIn } = useAuthStore();

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<SideLayout><Profile /></SideLayout>} />
            <Route path="/Mybooklist" element={<SideLayout><Mybooklist /></SideLayout>} />
            <Route path="/book/:id" element={<SideLayout><BookDetail /></SideLayout>} />
            <Route path="/settings" element={<SideLayout><SettingsPage /></SideLayout>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;