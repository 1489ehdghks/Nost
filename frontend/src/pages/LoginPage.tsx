// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

export default LoginPage;
