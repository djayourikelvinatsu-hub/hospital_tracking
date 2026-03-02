import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    const { user } = useAuth();

    return (
        <header className="header">
            <div className="header-left">
                <button className="mobile-menu-btn icon-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="header-search">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="header-actions">
                <button className="icon-btn">
                    <div className="nav-badge">3</div>
                    <Bell size={20} />
                </button>

                <div className="user-profile">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user ? user.name : 'Guest User'}</span>
                        <span className="user-role" style={{ textTransform: 'capitalize' }}>
                            {user ? user.role : 'Guest'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
