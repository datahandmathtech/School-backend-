import React from 'react';

const PremiumDateInput = ({ label, value, onChange, required }) => {
    return (
        <div className={label ? "premium-input-group" : ""}>
            {label && <label className="premium-label">{label}</label>}
            <input
                type="date"
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="premium-compact-input"
                style={{ height: '56px', fontSize: '15px', fontWeight: '700', width: '100%', boxSizing: 'border-box' }}
            />
        </div>
    );
};

export default PremiumDateInput;
