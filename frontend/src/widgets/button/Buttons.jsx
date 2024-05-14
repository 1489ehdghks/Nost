import React from 'react';
import './Button.scss';

const Button = ({ children, onClick, className = '', type = "button" }) => {
    return (
        <button className={`common-button ${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;