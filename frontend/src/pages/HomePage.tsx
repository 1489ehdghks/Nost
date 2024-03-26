import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Our Story App</h1>
            <button onClick={() => navigate('/main')}>Login</button>
            <button onClick={() => navigate('/main')}>Sign Up</button>
        </div>
    );
}

export default HomePage;
