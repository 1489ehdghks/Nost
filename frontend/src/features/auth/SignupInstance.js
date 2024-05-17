import useGlobalStore from '../../shared/store/GlobalStore';
import axiosInstance from './AuthInstance';


export const signup = async (email, password1, password2, nickname) => {
    useGlobalStore.getState().setIsLoading(true);
    useGlobalStore.getState().setError(null);
    try {
        const response = await axiosInstance.post('/api/accounts/', {
            email,
            password1,
            password2,
            nickname,
        });
        const data = response.data;
        console.log('Sign Up successful:', data);
        console.log('Sign Up User Data:', data);

    } catch (err) {
        useGlobalStore.getState().setError(err.response?.data || 'Sign Up failed');
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};