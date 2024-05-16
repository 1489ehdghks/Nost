import React, { useState } from 'react';
import './LoginForm.scss';



const LoginForm = ({ onClose }) => {
    const [isLoginFormActive, setLoginFormActive] = useState(true);
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const [signupInputs, setSignupInputs] = useState({ username: '', email: '', password: '' });

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInputs({ ...loginInputs, [name]: value });
    };

    const handleSignupInputChange = (event) => {
        const { name, value } = event.target;
        setSignupInputs({ ...signupInputs, [name]: value });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // TODO: 로그인 api
        console.log('Login with:', loginInputs);
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        // TODO: 회원가입 api
        console.log('Sign Up with:', signupInputs);
    };

    const toggleForms = () => {
        setLoginFormActive(!isLoginFormActive);
    };


    return (
        <div className="modalOverlay">
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>

                <div className="user_options-container">
                    {/* 로그인 회원가입 스위칭*/}
                    <div className={`user_options-text ${isLoginFormActive ? '' : 'slide-out'}`}>

                        {/* Unregistered user's view */}
                        <div className="user_options-unregistered">
                            <h2 className="user_unregistered-title">Don't have an account?</h2>
                            <p className="user_unregistered-text">Sign up to join our community!</p>
                            <button className="user_unregistered-signup" onClick={() => setLoginFormActive(false)}>SIGN UP</button>
                        </div>
                        {/* Registered user's view */}
                        <div className="user_options-registered">
                            <h2 className="user_registered-title">Have an account?</h2>
                            <p className="user_registered-text">Log in to continue.</p>
                            <button className="user_registered-login" onClick={() => setLoginFormActive(true)}>LOGIN</button>
                        </div>
                    </div>
                </div>



                {/* Forms container */}
                <div className={`forms-container ${isLoginFormActive ? 'show-login' : 'show-signup'}`}>
                    {/* Login form */}
                    <div className={`user_forms-login ${isLoginFormActive ? 'active' : 'inactive'}`}>
                        <button className="closeButton" onClick={onClose}>&times;</button>
                        <h2 className="forms_title">Login</h2>
                        <form className="forms_form" onSubmit={handleLoginSubmit}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="forms_field-input"
                                        required
                                        autoFocus
                                        name="username"
                                        value={loginInputs.username}
                                        onChange={handleLoginInputChange}
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
                                    />
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <button type="button" className="forms_buttons-forgot">Forgot password?</button>
                                <input type="submit" value="Log In" className="forms_buttons-action" />
                            </div>
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
                                        value={signupInputs.username}
                                        onChange={handleSignupInputChange}
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
                                    />
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="forms_field-input"
                                        required
                                        name="password"
                                        value={signupInputs.password}
                                        onChange={handleSignupInputChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Sign Up" className="forms_buttons-action" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;