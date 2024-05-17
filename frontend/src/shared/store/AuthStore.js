import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
    token: null,
    refreshToken: null,
    userId: null,
    nickname: null,
    email: null,
    isLoggedIn: false,
    setToken: (token) => set({ token }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    setUserId: (userId) => set({ userId }),
    setNickname: (nickname) => set({ nickname }),
    setEmail: (email) => set({ email }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}), {
    name: 'auth_store',
}));

export default useAuthStore;