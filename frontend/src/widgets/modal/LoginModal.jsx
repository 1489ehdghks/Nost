import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/LoginInstance';
import { signup } from '../../features/auth/SignupInstance';
import useGlobalStore from '../../shared/store/GlobalStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LoginModal.scss';



const LoginModal = ({ onClose }) => {
    const [isLoginFormActive, setLoginFormActive] = useState(true);
    const [loginInputs, setLoginInputs] = useState({ email: '', password: '' });
    const [loginErrors, setLoginErrors] = useState({});
    const [signupInputs, setSignupInputs] = useState({ nickname: '', email: '', password1: '', password2: '' });
    const [signupErrors, setSignupErrors] = useState({});
    const isLoading = useGlobalStore(state => state.isLoading);
    const globalError = useGlobalStore(state => state.error);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (signupSuccess) {
            toast.success("회원가입 성공! 로그인해주세요.");
        }
    }, [signupSuccess]);


    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInputs({ ...loginInputs, [name]: value });
    };

    const handleSignupInputChange = (event) => {
        const { name, value } = event.target;
        setSignupInputs({ ...signupInputs, [name]: value });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginErrors({});
        await login(loginInputs.email, loginInputs.password);
        if (globalError) {
            const errors = {};
            if (globalError.includes('email')) {
                errors.email = globalError;
            } else if (globalError.includes('password')) {
                errors.password = globalError;
            } else {
                errors.non_field_errors = globalError;
            }
            setLoginErrors(errors);
        } else {
            navigate('/');
        }
    };


    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        setSignupErrors({});
        if (signupInputs.password1 !== signupInputs.password2) {
            setSignupErrors({ password2: ['Passwords do not match'] });
            return;
        }
        const response = await signup(signupInputs.email, signupInputs.password1, signupInputs.password2, signupInputs.nickname);
        setSignupSuccess(true);
        setLoginFormActive(true);
    };

    return (
        <div className="modalOverlay">
            <ToastContainer />
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <div className="user_options-container">
                    <div className={`user_options-text ${isLoginFormActive ? '' : 'slide-out'}`}>
                        {/* 로그인 왼쪽 */}
                        <div className="user_options-unregistered">
                            <h2 className="user_unregistered-title">Don't have an account?</h2>
                            <p className="user_unregistered-text">Sign up to join our community!</p>
                            <button className="user_unregistered-signup" onClick={() => setLoginFormActive(false)}>SIGN UP</button>
                        </div>

                        {/* 로그인 오른쪽 */}
                        <div className="user_options-registered">
                            <h2 className="user_registered-title">Have an account?</h2>
                            <p className="user_registered-text">Log in to continue.</p>
                            <button className="user_registered-login" onClick={() => setLoginFormActive(true)}>LOGIN</button>
                        </div>
                    </div>
                </div>



                {/* Forms */}
                <div className={`forms-container ${isLoginFormActive ? 'show-login' : 'show-signup'}`}>
                    {/* 로그인폼 */}
                    <div className={`user_forms-login ${isLoginFormActive ? 'active' : 'inactive'}`}>
                        <button className="closeButton" onClick={onClose}>&times;</button>
                        <h2 className="forms_title">Login</h2>
                        <form className="forms_form" onSubmit={handleLoginSubmit}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="forms_field-input"
                                        required
                                        autoFocus
                                        name="email"
                                        value={loginInputs.email}
                                        onChange={handleLoginInputChange}
                                        disabled={isLoading}
                                    />
                                    {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="forms_field-input"
                                        required
                                        name="password"
                                        value={loginInputs.password}
                                        onChange={handleLoginInputChange}
                                        disabled={isLoading}
                                    />
                                    {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <button type="button" className="forms_buttons-forgot" disabled={isLoading}>Forgot password?</button>
                                <input type="submit" value="Log In" className="forms_buttons-action" disabled={isLoading} />
                            </div>
                            {loginErrors.non_field_errors && <div className="error-message">{loginErrors.non_field_errors}</div>}
                        </form>
                        <div className="social-login-buttons">
                            <button className="social-button google-login">
                                <img src="/path/to/google-icon.png" alt="Google Icon" />
                                Login with Google
                            </button>
                            <button className="social-button naver-login">
                                <img src="/path/to/naver-icon.png" alt="Naver Icon" />
                                Login with Naver
                            </button>
                        </div>
                    </div>


                    {/* 회원가입폼 */}
                    <div className={`user_forms-signup ${!isLoginFormActive ? 'active' : 'inactive'}`}>
                        <button className="closeButton" onClick={onClose}>&times;</button>
                        <h2 className="forms_title">Sign Up</h2>
                        <form className="forms_form" onSubmit={handleSignupSubmit}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input
                                        type="text"
                                        placeholder="Nickname"
                                        className="forms_field-input"
                                        required
                                        name="nickname"
                                        value={signupInputs.nickname}
                                        onChange={handleSignupInputChange}
                                        disabled={isLoading}
                                    />
                                    {signupErrors.nickname && <div className="error-message">{signupErrors.nickname}</div>}
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="forms_field-input"
                                        required
                                        name="email"
                                        value={signupInputs.email}
                                        onChange={handleSignupInputChange}
                                        disabled={isLoading}
                                    />
                                    {signupErrors.email && <div className="error-message">{signupErrors.email}</div>}
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="forms_field-input"
                                        required
                                        name="password1"
                                        value={signupInputs.password1}
                                        onChange={handleSignupInputChange}
                                        disabled={isLoading}
                                    />
                                    {signupErrors.password1 && <div className="error-message">{signupErrors.password1}</div>}
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="forms_field-input"
                                        required
                                        name="password2"
                                        value={signupInputs.password2}
                                        onChange={handleSignupInputChange}
                                        disabled={isLoading}
                                    />
                                    {signupErrors.password2 && <div className="error-message">{signupErrors.password2}</div>}
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Sign Up" className="forms_buttons-action" disabled={isLoading} />
                            </div>
                            {signupErrors.non_field_errors && <div className="error-message">{signupErrors.non_field_errors}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;