import React, { useState } from 'react';
import { login } from '../../features/auth/LoginInstance';
import { signup } from '../../features/auth/SignupInstance';
import useGlobalStore from '../../shared/store/GlobalStore';

import './LoginModal.scss';



const LoginModal = ({ onClose }) => {
    const [isLoginFormActive, setLoginFormActive] = useState(true);
    const [loginInputs, setLoginInputs] = useState({ email: '', password: '' });
    const [signupInputs, setSignupInputs] = useState({ nickname: '', email: '', password1: '', password2: '' });
    const isLoading = useGlobalStore(state => state.isLoading);


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
        await login(loginInputs.email, loginInputs.password);
    };


    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        if (signupInputs.password1 !== signupInputs.password2) {
            console.error('Passwords do not match');
            return;
        }
        await signup(signupInputs.email, signupInputs.password1, signupInputs.password2, signupInputs.nickname);
    };


    return (
        <div className="modalOverlay">
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
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <button type="button" className="forms_buttons-forgot" disabled={isLoading}>Forgot password?</button>
                                <input type="submit" value="Log In" className="forms_buttons-action" disabled={isLoading} />
                            </div>
                            {isLoading && <div>Loading...</div>}
                        </form>
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
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Sign Up" className="forms_buttons-action" disabled={isLoading} />
                            </div>
                            {isLoading && <div>Loading...</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;