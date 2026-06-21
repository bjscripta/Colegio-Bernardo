export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const getAuthHeaders = () => {
    const token = getAccessToken();

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`
    };
};

export const cerrarSesion = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('roles');
};