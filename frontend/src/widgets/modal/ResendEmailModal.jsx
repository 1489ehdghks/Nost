import React, { useState } from 'react';
import axiosInstance from '../../features/auth/AuthInstance';
import useThemeStore from '../../shared/store/Themestore';
import './ResendEmailModal.scss';

const ResendEmailModal = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleResendEmail = async () => {
        try {
            const response = await axiosInstance.post('/api/accounts/resend-email/', { email });
            // 이메일 재전송 성공 시 필요한 로직 추가
        } catch (error) {
            // 이메일 재전송 실패 시 필요한 로직 추가
        }
    };

    const handleResend = () => {
        setShowModal(false);
        handleResendEmail();
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>이메일 재전송</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h1>Resend Verification Email</h1>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <p>이메일을 재전송하시겠습니까?</p>
                        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }} onClick={handleResend}>재전송</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResendEmailModal;
