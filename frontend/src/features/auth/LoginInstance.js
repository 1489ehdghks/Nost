import useAuthStore from '../../shared/store/AuthStore';
import useGlobalStore from '../../shared/store/GlobalStore';
import axiosInstance from './AuthInstance';


export const login = async (username, password) => {
    useGlobalStore.getState().setIsLoading(true);
    useGlobalStore.getState().setError(null);
    try {
        const response = await axiosInstance.post('/api/accounts/login', {
            username,
            password,
        });

        const data = response.data;

        useAuthStore.getState().setToken(data.access);
        useAuthStore.getState().setRefreshToken(data.refresh);
        useAuthStore.getState().setUser({ username });
        useAuthStore.getState().setIsLoggedIn(true);

        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('username', username);
    } catch (err) {
        useGlobalStore.getState().setError(err.response?.data || 'Login failed');
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};
