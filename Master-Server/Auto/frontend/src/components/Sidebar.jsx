import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    Users,
    Settings,
    Activity,
    LogOut,
    Clock,
    Zap,
    Wrench,
    Package,
    FileText,
    Shield
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../store/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const allLinks = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
        { to: '/live-feed', label: 'Live Feed', icon: Activity, id: 'liveFeed' },
        { to: '/logbook', label: 'Log Book', icon: FileText, id: 'logBook' },
        { to: '/drivers', label: 'Drivers Services', icon: Users, id: 'driversServices' },
        { to: '/vehicles', label: 'Vehicles MGT', icon: Car, id: 'vehiclesMgt' },
        { to: '/vehicles-life', label: 'Vehicles Life', icon: Wrench, id: 'vehiclesLife' },
        { to: '/staff', label: 'Staff', icon: Users, id: 'staffManagement' },
        { to: '/admins', label: 'Manage Admins', icon: Shield, id: 'manageAdmins' },
    ];

    const links = allLinks.filter(link => {
        if (user?.role === 'admin') return true;
        if (user?.role === 'executive' && user?.permissions) {
            return !!user.permissions[link.id];
        }
        return false;
    });

    return (
        <div className="sidebar">
            <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '0.5rem' }}>
                <div style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logo} alt="Auto Management Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '1px', lineHeight: 1 }}>AUTO
                    </h2>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>Management</span>
                </div>
            </div>

            <nav className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', paddingRight: '4px' }}>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {({ isActive }) => (
                            <>
                                <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }} />
                                <span>{link.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--accent)' }}>
                        {user?.name?.[0] || 'A'}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{user?.name || 'Admin User'}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize', marginTop: '4px' }}>{user?.role || 'admin'}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="btn btn-glass"
                    style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--text-secondary)' }}
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
