const TOKEN_KEY = 'authorized';
const TOKEN_ADMIN_KEY = 'admin_authorized';

export const authenticated = (action) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({...action?.payload}))
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const userAuthenticated= () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

export const adminAuthenticated = (action) => {
    localStorage.setItem(TOKEN_ADMIN_KEY, JSON.stringify({...action?.payload}))
}

export const adminLogout = () => {
    localStorage.removeItem(TOKEN_ADMIN_KEY);
}

export const adminUserAuthenticated= () => {
    if (localStorage.getItem(TOKEN_ADMIN_KEY)) {
        return true;
    }
    return false;
}