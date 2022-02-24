import { useState } from 'react';

export  default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('access-token');
        return tokenString
    }
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        localStorage.setItem('access-token', userToken.token);
        localStorage.setItem('access-token-expiration', userToken.expiresIn);
        setToken(userToken.token);
    }
    const RemoveToken = () => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('access-token-expiration');
        setToken(null)
        return true
    }
    return {
        setToken: saveToken,
        logout: RemoveToken,
        token
    }
}
