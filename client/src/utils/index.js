const TOKEN_KEY = 'authorized';

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