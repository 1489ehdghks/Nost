import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
    token: null,
    refreshToken: null,
    user: null,
    isLoggedIn: false,
    setToken: (token) => set({ token }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    setUser: (user) => set({ user }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}), {
    name: 'auth-storage',
}));

export default useAuthStore;