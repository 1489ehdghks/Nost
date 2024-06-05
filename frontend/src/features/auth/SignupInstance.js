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

    } catch (error) {
        useGlobalStore.getState().setError(error.response?.data || 'Sign Up failed');
        if (error.response && error.response.data) {
            return { success: false, errors: error.response.data };
        }
        return { success: false, errors: { non_field_errors: ['An unexpected error occurred. Please try again.'] } };
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};

// // 이메일 인증 해서 성공하면 successful 로 넘김
// export const verifyEmail = async (email) => {
//     useGlobalStore.getState().setIsLoading(true);
//     useGlobalStore.getState().setError(null);
//     try {
//         const response = await axiosInstance.post('/api/verify-email/', { email });
//         const data = response.data;
//         console.log('Email verification successful:', data);
//         return { success: true };
//     } catch (error) {
//         useGlobalStore.getState().setError(error.response?.data || 'Email verification failed');
//         return { success: false };
//     } finally {
//         useGlobalStore.getState().setIsLoading(false);
//     }
// };