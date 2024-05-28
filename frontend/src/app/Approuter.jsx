import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MainPage from '../pages/main/MainPage';
import useAuthStore from '../shared/store/AuthStore';
import Profile from '../pages/profile/Profile';
import Mybooklist from '../pages/mybooks/Mybooklist';
import CardDetail from '../widgets/card/CardDetail';
import SideLayout from '../widgets/layout/sideLayout/SideLayout';

const AppRouter = () => {
    const { isLoggedIn } = useAuthStore();

    const ProfileWithLayout = () => (
        <SideLayout>
            <Profile />
        </SideLayout>
    );

    const MybooklistWithLayout = () => (
        <SideLayout>
            <Mybooklist />
        </SideLayout>
    );

    const MybooklistWithCardDetail = () => (
        <SideLayout>
            <CardDetail />
        </SideLayout>
    );

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfileWithLayout />} />
            <Route path="/Mybooklist" element={<MybooklistWithLayout />} />
            <Route path="/card/:id" element={<MybooklistWithCardDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;