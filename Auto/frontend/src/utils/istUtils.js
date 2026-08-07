export const todayIST = () => {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
};

export const nowIST = () => {
    return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
};

export const toISTDateString = (date) => {
    return new Date(date).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
};

export const formatDateIST = (date) => {
    return new Date(date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatTimeIST = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
};

