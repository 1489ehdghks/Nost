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
        useAuthStore.getState().setUser({
            id: data.user.id,
            name: data.user.name,
            nickname: data.user.nickname,
            email: data.user.email,
            profilePicture: data.user.profile_picture,
        });

        console.log("11111로그인 성공:")
    } catch (err) {
        
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            console.log("로그인 에러:",err.response.data);
            let errorMessage = 'Login failed';
            if (errorData.detail === 'No active account found with the given credentials') {
                errorMessage = 'Invalid email or password';
            } else if (errorData.email) {
                errorMessage = 'The email address is not registered';
                alert('이메일 주소가 맞지 않습니다.');
            } else if (errorData.password) {
                errorMessage = 'Incorrect password';
                alert('패스워드가 틀렸습니다.');
            } else if (errorData.detail) {
                errorMessage = errorData.detail;
            } else if (errorData.non_field_errors && errorData.non_field_errors.includes('Email is not verified.')) {
                errorMessage = 'Email is not verified.';
                alert('이메일 확인이 되지 않았습니다. 인증메일을 확인한 후 로그인 해 주세요.');
            }
            
            useGlobalStore.getState().setError(errorMessage);
        } else {
            useGlobalStore.getState().setError('Login failed');
        }
    } finally {
        useGlobalStore.getState().setIsLoading(false);
    }
};
