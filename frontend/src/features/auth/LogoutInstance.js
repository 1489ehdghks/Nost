// /src/features/auth/LogoutInstance.js
import useAuthStore from './store/AuthStore';

export const logout = () => {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setRefreshToken(null);
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
};
