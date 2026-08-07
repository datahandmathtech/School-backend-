'use client'

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
    }
    return null;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
};
