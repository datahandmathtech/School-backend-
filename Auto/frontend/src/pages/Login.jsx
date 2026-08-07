import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user.role === 'admin' || user.role === 'executive') navigate('/dashboard');
            else if (user.role === 'staff') navigate('/staff-portal');
            else navigate('/driver-dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow Effects */}
            <div style={{
                position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw',
                background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute', bottom: '10%', right: '20%', width: '30vw', height: '30vw',
                background: 'radial-gradient(circle, rgba(0,255,157,0.1) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
            }}></div>

            {/* Login Card */}
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '20px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem', padding: '12px',
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        <img src={logo} alt="Yatree Auto Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Yatree Auto</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Premium Fleet Management</p>
                </div>

                {error && (
                    <div style={{
                        padding: '1rem', background: 'rgba(255, 51, 102, 0.1)',
                        color: 'var(--danger)', border: '1px solid rgba(255, 51, 102, 0.2)',
                        borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem',
                        textAlign: 'center', fontWeight: 500
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Username or Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="text"
                                className="glass-input"
                                style={{ width: '100%', paddingLeft: '2.75rem', height: '48px' }}
                                placeholder="Enter Username or Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="password"
                                className="glass-input"
                                style={{ width: '100%', paddingLeft: '2.75rem', height: '48px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', height: '48px', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Secure Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
