import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MainPage from '../pages/main/MainPage';
import useAuthStore from '../shared/store/AuthStore';
import ProfilePage from '../pages/profile/ProfilePage';
import SideLayout from '../widgets/layout/sideLayout/SideLayout';


const AppRouter = () => {
    const { isLoggedIn } = useAuthStore();


    const ProfileWithLayout = () => (
        <SideLayout>
            <ProfilePage />
        </SideLayout>
    );

    return (

        <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfileWithLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    );
};

export default AppRouter;