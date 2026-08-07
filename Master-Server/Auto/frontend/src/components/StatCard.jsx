import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    return (
        <div className="card" style={{ 
            display: 'flex', 
            gap: '1.25rem', 
            alignItems: 'center',
            padding: '1.75rem',
            border: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `${color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                boxShadow: `0 8px 16px -4px ${color}20`
            }}>
                <Icon size={28} strokeWidth={2.5} />
            </div>
            <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, letterSpacing: '0.01em' }}>{title}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{value}</h3>
                    {trend && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: trend > 0 ? '#10b981' : '#ef4444' }}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                    )}
                </div>
            </div>
            {/* Subtle background decoration */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `${color}05`,
                zIndex: 0
            }}></div>
        </div>
    );
};

export default StatCard;
