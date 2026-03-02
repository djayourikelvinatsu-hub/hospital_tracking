import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../ui/ToastContainer';

const Layout = ({ children }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="app-container">
            <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
            <div className={`main-content-wrapper ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
                <Header toggleSidebar={toggleMobileSidebar} />
                <main className="main-content">
                    {children}
                </main>
            </div>
            {/* Overlay for mobile when sidebar is open */}
            {isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Layout;
