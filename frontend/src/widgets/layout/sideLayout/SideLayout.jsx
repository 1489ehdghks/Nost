import React, { useState } from 'react';
import './SideLayout.scss';
import { FaBars } from 'react-icons/fa';

const SideLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="side-layout">
            <div className="menu-icon" onClick={toggleSidebar}>
                <FaBars />
            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button>Main</button>
                <button>Profile</button>
                <button>My Book</button>
                <button>Setting</button>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default SideLayout;
