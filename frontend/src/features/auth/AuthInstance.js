import axios from 'axios';
import useAuthStore from '../../shared/store/AuthStore';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 모든 요청에 액세스 토큰을 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 액세스 토큰 만료 시 자동으로 리프레시 토큰을 사용해 갱신
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const { refreshToken, refreshToken: refresh } = useAuthStore.getState();

        // 액세스 토큰 만료인 경우 처리
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;

            // 리프레시 토큰으로 새 액세스 토큰을 요청
            try {
                const response = await axios.post('http://localhost:8000/api/accounts/token/refresh/', { refresh });
                const newAccessToken = response.data.access;
                useAuthStore.getState().setToken(newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 다시 요청을 보내도록 설정
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
