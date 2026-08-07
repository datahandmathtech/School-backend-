import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [sidebarActive, setSidebarActive] = useState(false);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="app-container">
            <div className={`sidebar-container ${sidebarActive ? 'active' : ''}`}>
                <Sidebar />
            </div>

            {/* Mobile Overlay */}
            {sidebarActive && (
                <div 
                    onClick={() => setSidebarActive(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(10, 10, 15, 0.6)', backdropFilter: 'blur(8px)',
                        zIndex: 40
                    }}
                />
            )}

            <main className="main-content">
                {/* Mobile Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem', background: 'var(--surface)', backdropFilter: 'var(--glass-blur)',
                    borderBottom: '1px solid var(--border-glass)',
                    position: 'sticky', top: 0, zIndex: 30, marginBottom: '1rem',
                    borderRadius: 'var(--radius)'
                }} className="mobile-only-header glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button 
                            onClick={() => setSidebarActive(!sidebarActive)}
                            className="btn btn-glass"
                            style={{ padding: '0.5rem' }}
                        >
                            {sidebarActive ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                    <span style={{color: 'var(--accent)', fontWeight: 600}}>AUTO MANAGEMENT</span>
                </div>

                <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
                    {children}
                </div>
            </main>

            <style>{`
                @media (max-width: 768px) {
                    .sidebar-container {
                        transform: translateX(-100%);
                        position: fixed;
                        z-index: 50;
                        transition: transform 0.3s ease;
                    }
                    .sidebar-container.active {
                        transform: translateX(0);
                    }
                    .main-content {
                        margin-left: 0;
                        padding: 1rem;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-only-header { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default Layout;
