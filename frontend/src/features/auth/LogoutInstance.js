// /src/features/auth/LogoutInstance.js
import useAuthStore from '../../shared/store/AuthStore';

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');


    //세션 스토리지
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');


    //쿠키에서 토큰 삭제
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


    useAuthStore.getState().logout();
    console.log("로그아웃 성공:")
};
