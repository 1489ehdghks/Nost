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
        useAuthStore.getState().setToken(data.access);
        useAuthStore.getState().setRefreshToken(data.refresh);
        useAuthStore.getState().setIsLoggedIn(true);
        useAuthStore.getState().setUserId(data.user.id);
        useAuthStore.getState().setNickname(data.user.nickname);
        useAuthStore.getState().setEmail(data.user.email);
        useAuthStore.getState().setUser({
            id: data.user.id,
            name: data.user.name,
            nickname: data.user.nickname,
            email: data.user.email,
            profilePicture: data.user.profile_picture,
        });
    } catch (err) {
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            let errorMessage = 'Login failed';
            if (errorData.detail === 'No active account found with the given credentials') {
                errorMessage = 'Invalid email or password';
                alert(errorMessage);
            } else if (errorData.email) {
                errorMessage = 'The email address is not registered';
                alert(errorMessage);
            } else if (errorData.password) {
                errorMessage = 'Incorrect password';
                alert(errorMessage);
            } else if (errorData.detail) {
                errorMessage = errorData.detail;
                alert(errorMessage);
            }
            useGlobalStore.getState().setError(errorMessage);
        } else {
            useGlobalStore.getState().setError('Login failed');
        }
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};
