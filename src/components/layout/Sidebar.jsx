import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    LogIn,
    UsersRound,
    Bed,
    Stethoscope,
    Activity,
    LogOut
} from 'lucide-react';
import './Sidebar.css';
import logoImg from '../../assets/logo.png';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/gate-entry', label: 'Gate & Entry', icon: LogIn },
    { path: '/patient-records', label: 'Patient Records', icon: UsersRound },
    { path: '/facility', label: 'Facility Mgt', icon: Bed },
    { path: '/staff', label: 'Staff & Roster', icon: Stethoscope },
    { path: '/clinical', label: 'Clinical Tracking', icon: Activity },
];

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavClick = () => {
        if (window.innerWidth <= 768 && onClose) {
            onClose();
        }
    };

    return (
        <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-logo">
                <img src={logoImg} alt="MediTrack Pro Logo" className="logo-img" />
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
