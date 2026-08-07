import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Plus, Trash2, Shield, User as UserIcon, Lock, Phone, UserCheck, CheckSquare, Square, Settings, Activity, X, Users, Edit3, Wrench, Briefcase, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
// Removed ThemeContext
import { motion, AnimatePresence } from 'framer-motion';

const Admins = () => {
    // Removed useTheme() call
    const [executives, setExecutives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [editingAdmin, setEditingAdmin] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState({
        dashboard: true,
        liveFeed: false,
        logBook: false,
        driversServices: false,
        vehiclesMgt: false,
        vehiclesLife: false,
        staffManagement: false,
        manageAdmins: false
    });

    const [expandedModule, setExpandedModule] = useState(null);

    const moduleHierarchy = [
        { id: 'dashboard', label: 'Dashboard Access', icon: Activity, color: '#0ea5e9' },
        { id: 'liveFeed', label: 'Live Feed Access', icon: Activity, color: '#ef4444' },
        { id: 'logBook', label: 'Log Book Access', icon: CheckSquare, color: '#eab308' },
        { id: 'driversServices', label: 'Drivers Services', icon: Users, color: '#38bdf8' },
        { id: 'vehiclesMgt', label: 'Vehicles MGT', icon: Wrench, color: '#f59e0b' },
        { id: 'vehiclesLife', label: 'Vehicles Life', icon: Activity, color: '#ec4899' },
        { id: 'staffManagement', label: 'Staff Management', icon: Users, color: '#8b5cf6' },
        { id: 'manageAdmins', label: 'Manage Admins', icon: Shield, color: '#10b981' }
    ];

    useEffect(() => {
        fetchExecutives();
    }, []);

    const fetchExecutives = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin/executives');
            setExecutives(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAdmin) {
                await axios.put(`/api/admin/executives/${editingAdmin._id}`, {
                    name, mobile, username, password: password || undefined, permissions
                });
                alert('Admin updated successfully');
            } else {
                await axios.post('/api/admin/executives', {
                    name, mobile, username, password, permissions
                });
                alert('Admin created successfully');
            }
            closeModal();
            fetchExecutives();
        } catch (err) {
            alert(err.response?.data?.message || 'Error processing request');
        }
    };

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setName(admin.name);
        setMobile(admin.mobile);
        setUsername(admin.username);
        setPassword('');

        // Normalize permissions from DB
        const dbPerms = admin.permissions || {};
        const normalized = {
            dashboard: dbPerms.dashboard ?? true,
            liveFeed: dbPerms.liveFeed ?? false,
            logBook: dbPerms.logBook ?? false,
            driversServices: dbPerms.driversServices ?? false,
            vehiclesMgt: dbPerms.vehiclesMgt ?? false,
            vehiclesLife: dbPerms.vehiclesLife ?? false,
            staffManagement: !!dbPerms.staffManagement,
            manageAdmins: !!dbPerms.manageAdmins
        };
        setPermissions(normalized);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingAdmin(null);
        setExpandedModule(null);
        setName(''); setMobile(''); setUsername(''); setPassword('');
        setPermissions({
            dashboard: true,
            liveFeed: false,
            logBook: false,
            driversServices: false,
            vehiclesMgt: false,
            vehiclesLife: false,
            staffManagement: false,
            manageAdmins: false
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this admin access?')) return;
        try {
            await axios.delete(`/api/admin/executives/${id}`);
            fetchExecutives();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting user');
        }
    };

    const toggleMainPermission = (key) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isFormModuleActive = (key) => {
        return !!permissions[key];
    };

    const checkAdminAccess = (adminPerms, key) => {
        return !!adminPerms?.[key];
    };

    return (
        <div className="container-fluid" style={{ paddingBottom: '40px' }}>

            <header className="flex-resp" style={{
                justifyContent: 'space-between',
                padding: '30px 0',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: 'clamp(40px,10vw,50px)',
                        height: 'clamp(40px,10vw,50px)',
                        background: 'linear-gradient(135deg, white, #f8fafc)',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        flexShrink: 0
                    }}>
                        <UserIcon size={28} color="var(--primary)" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: `0 0 8px rgba(0,240,255,0.6)` }}></div>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>System Access</span>
                        </div>
                        <h1 style={{ color: 'white', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>
                            Admin <span className="theme-gradient-text">Console</span>
                        </h1>
                    </div>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setShowModal(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        height: '52px',
                        padding: '0 25px',
                        borderRadius: '14px',
                        fontWeight: '1000',
                        cursor: 'pointer',
                        background: 'var(--accent)',
                        border: 'none',
                        color: 'black',
                        boxShadow: `0 8px 15px rgba(0,240,255,0.4)`
                    }}
                >
                    <Plus size={20} /> Create New Access
                </button>
            </header>

            <div className="table-responsive-wrapper">
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '20px 25px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>User Details</th>
                            <th style={{ padding: '20px 25px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Login Identity</th>
                            <th style={{ padding: '20px 25px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Modules Access</th>
                            <th style={{ padding: '20px 25px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'right', letterSpacing: '1px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {executives.length === 0 ? (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', opacity: 0.3 }}>
                                    <Shield size={48} />
                                    <div style={{ fontSize: '16px', fontWeight: '700' }}>No admin accounts found</div>
                                </div>
                            </td></tr>
                        ) : (
                            executives.map((admin) => (
                                <tr key={admin._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s ease' }} className="hover-row">
                                    <td style={{ padding: '18px 25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05))', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
                                                <UserIcon size={20} />
                                            </div>
                                            <div>
                                                <div style={{ color: 'white', fontWeight: '900', fontSize: '15px' }}>{admin.name}</div>
                                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', fontWeight: '700' }}><Phone size={10} style={{ display: 'inline', marginBottom: '-1px', marginRight: '4px' }}/>{admin.mobile || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 25px' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'inline-block' }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '13px' }}>@{admin.username || admin.email?.split('@')[0] || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 25px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {admin.role === 'admin' ? (
                                                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '10px', fontWeight: '900', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.15)', textTransform: 'uppercase' }}>Full Access (Super Admin)</span>
                                            ) : (
                                                <>
                                                    {checkAdminAccess(admin.permissions, 'dashboard') && <span style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(14, 165, 233, 0.15)', textTransform: 'uppercase' }}>Dashboard</span>}
                                                    {checkAdminAccess(admin.permissions, 'liveFeed') && <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.15)', textTransform: 'uppercase' }}>Live Feed</span>}
                                                    {checkAdminAccess(admin.permissions, 'logBook') && <span style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.15)', textTransform: 'uppercase' }}>Log Book</span>}
                                                    {checkAdminAccess(admin.permissions, 'driversServices') && <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.15)', textTransform: 'uppercase' }}>Drivers</span>}
                                                    {checkAdminAccess(admin.permissions, 'vehiclesMgt') && <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.15)', textTransform: 'uppercase' }}>Vehicles MGT</span>}
                                                    {checkAdminAccess(admin.permissions, 'vehiclesLife') && <span style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(236, 72, 153, 0.15)', textTransform: 'uppercase' }}>Vehicles Life</span>}
                                                    {checkAdminAccess(admin.permissions, 'staffManagement') && <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(139, 92, 246, 0.15)', textTransform: 'uppercase' }}>Staff MGT</span>}
                                                    {checkAdminAccess(admin.permissions, 'manageAdmins') && <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '9px', fontWeight: '900', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.15)', textTransform: 'uppercase' }}>Admin MGT</span>}
                                                    {!checkAdminAccess(admin.permissions, 'dashboard') && !checkAdminAccess(admin.permissions, 'liveFeed') && !checkAdminAccess(admin.permissions, 'logBook') && !checkAdminAccess(admin.permissions, 'driversServices') && !checkAdminAccess(admin.permissions, 'vehiclesMgt') && !checkAdminAccess(admin.permissions, 'vehiclesLife') && !checkAdminAccess(admin.permissions, 'staffManagement') && !checkAdminAccess(admin.permissions, 'manageAdmins') && (
                                                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontStyle: 'italic' }}>No modules assigned</span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 25px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleEdit(admin)}
                                                style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '10px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.1)', cursor: 'pointer', transition: '0.2s' }}
                                                className="btn-hover-scale"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(admin._id)}
                                                style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '10px', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.1)', cursor: 'pointer', transition: '0.2s' }}
                                                className="btn-hover-scale"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {showModal && (
                    <div className="modal-overlay" style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '40px 20px',
                        overflowY: 'auto'
                    }}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="modal-content-wrapper"
                            style={{ 
                                maxWidth: '700px', 
                                width: '100%',
                                padding: 0,
                                background: '#0f172a',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                margin: 'auto'
                            }}
                        >
                            <div style={{ padding: '25px 35px', background: 'linear-gradient(to right, #1e293b, #0f172a)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ color: 'white', fontSize: '22px', margin: 0, fontWeight: '900' }}>{editingAdmin ? 'Update Admin Access' : 'Create New Access'}</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', margin: '4px 0 0', letterSpacing: '1px' }}>Permissions & Credentials</p>
                                </div>
                                <button 
                                    onClick={closeModal} 
                                    style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        background: 'rgba(255,255,255,0.05)', 
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '35px' }}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                        <input value={name} onChange={e => setName(e.target.value)} required placeholder="Admin Name" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: 'white', padding: '0 16px', height: '54px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', outline: 'none', transition: 'all 0.3s' }} onFocus={e => e.target.style.border = '1px solid var(--accent)'} onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.05)'} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Mobile Number</label>
                                        <input value={mobile} onChange={e => setMobile(e.target.value)} required placeholder="10-digit #" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: 'white', padding: '0 16px', height: '54px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', outline: 'none', transition: 'all 0.3s' }} onFocus={e => e.target.style.border = '1px solid var(--accent)'} onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.05)'} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>System Username</label>
                                        <input
                                            name="admin-username"
                                            autoComplete="off"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Unique ID"
                                            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--primary)', padding: '0 16px', height: '54px', borderRadius: '14px', fontSize: '14px', fontWeight: '900', outline: 'none', transition: 'all 0.3s' }}
                                            onFocus={e => e.target.style.border = '1px solid var(--primary)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.05)'}
                                        />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{editingAdmin ? 'New Password (Optional)' : 'Access Password'}</label>
                                        <input
                                            type="password"
                                            name="admin-password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required={!editingAdmin}
                                            placeholder="••••••••"
                                            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: 'white', padding: '0 16px', height: '54px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', outline: 'none', transition: 'all 0.3s', letterSpacing: '3px' }}
                                            onFocus={e => e.target.style.border = '1px solid var(--accent)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.05)'}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                        <h3 style={{ color: 'white', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Assign Modules Access</h3>
                                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                                        {moduleHierarchy.map(mod => {
                                            const isActive = isFormModuleActive(mod.id);
                                            return (
                                                <div 
                                                    key={mod.id} 
                                                    onClick={() => toggleMainPermission(mod.id)}
                                                    style={{
                                                        borderRadius: '16px',
                                                        background: isActive ? `${mod.color}15` : 'rgba(255,255,255,0.02)',
                                                        border: `1px solid ${isActive ? `${mod.color}50` : 'rgba(255,255,255,0.05)'}`,
                                                        padding: '14px 16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '14px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: isActive ? `0 4px 15px ${mod.color}20` : 'none',
                                                        transform: isActive ? 'translateY(-2px)' : 'none'
                                                    }}
                                                    className="hover-row"
                                                >
                                                    <div style={{
                                                        width: '24px', height: '24px', borderRadius: '6px',
                                                        background: isActive ? mod.color : 'rgba(255,255,255,0.1)',
                                                        color: isActive ? 'white' : 'transparent',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        transition: 'all 0.2s ease',
                                                        border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)'
                                                    }}>
                                                        {isActive && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: isActive ? '900' : '700', fontSize: '13px', transition: 'all 0.2s ease' }}>{mod.label}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button type="button" onClick={closeModal} style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', fontWeight: '800', cursor: 'pointer', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> BACK
                                    </button>
                                    <button type="submit" className="btn-primary" style={{ flex: 1.5, padding: '15px', borderRadius: '14px', border: 'none', fontWeight: '900', cursor: 'pointer', height: '54px', fontSize: '15px', boxShadow: '0 8px 20px -6px rgba(14, 165, 233, 0.5)' }}>{editingAdmin ? 'Update Account' : 'Create Access'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admins;
