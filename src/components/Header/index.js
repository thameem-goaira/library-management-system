import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navbar } from '../../_mock/data';
import BrandLogo from '../../assets/brand_logo.png';
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log('location path check',location.pathname)
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className='header-container'>
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={BrandLogo} alt="Library Logo" />
                    <h4>Library Management System</h4>
                </div>
                <div className="hamburger" onClick={toggleNav}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <nav className="nav">
                <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
                    <p><span className="close-icon" onClick={toggleNav}>&times;</span></p>
                    {
                        navbar.map((navItem, index) => {
                            const isActive = location.pathname === navItem.link;
                            return (
                                <li
                                    key={index}
                                    className={`nav-item ${isActive ? 'active-link' : ''}`}
                                    onClick={() => {
                                        navigate(navItem.link);
                                        setIsOpen(false);
                                    }}
                                >
                                    {navItem.title}
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
