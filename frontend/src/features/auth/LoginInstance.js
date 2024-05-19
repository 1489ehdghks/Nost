import useAuthStore from '../../shared/store/AuthStore';
import useGlobalStore from '../../shared/store/GlobalStore';
import axiosInstance from './AuthInstance';


export const login = async (email, password) => {
    useGlobalStore.getState().setIsLoading(true);
    useGlobalStore.getState().setError(null);
    try {
        const response = await axiosInstance.post('/api/accounts/login/', {
            email,
            password,
        });

        const data = response.data;
        console.log("data:", data)

        useAuthStore.getState().setToken(data.access);
        useAuthStore.getState().setRefreshToken(data.refresh);
        useAuthStore.getState().setIsLoggedIn(true);
        useAuthStore.getState().setUserId(data.user.id);
        useAuthStore.getState().setNickname(data.user.nickname);
        useAuthStore.getState().setEmail(data.user.email);


        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('nickname', data.user.nickname);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('userId', data.user.id);




        console.log("11111로그인 성공:")

    } catch (err) {
        useGlobalStore.getState().setError(err.response?.data || 'Login failed');
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};
