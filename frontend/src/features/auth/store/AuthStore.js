import create from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../AuthInstance';

const useAuthStore = create(persist((set, get) => ({
    token: null,
    refreshToken: null,
    user: null,
    error: null,
    isLoading: false,
    isLoggedIn: false,
    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post('/api/token/', {
                username,
                password,
            });
            const data = response.data;
            set({
                token: data.access,
                refreshToken: data.refresh,
                user: { username },
                isLoggedIn: true,
                isLoading: false
            });
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('username', username);
        } catch (err) {
            set({ error: err.response?.data?.detail || 'Login failed', isLoading: false });
        }
    },
    logout: () => {
        set({ token: null, refreshToken: null, user: null, isLoggedIn: false });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
    },
    refreshToken: async () => {
        const refreshToken = get().refreshToken;
        try {
            const response = await axiosInstance.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            const data = response.data;
            set({ token: data.access });
            localStorage.setItem('accessToken', data.access);
        } catch (err) {
            set({ error: 'Failed to refresh token' });
        }
    },
}), {
    name: 'auth-storage',
}));

export default useAuthStore;
