import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <Link to="/" className="home-button">Go Home</Link>
        </div>
    );
};

export default NotFound;
