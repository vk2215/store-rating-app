import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost:5000/api';

    const checkAuthStatus = () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1]));
                const now = Date.now() / 1000;
                if (payload.exp > now) {
                    setUser({ id: payload.id, role: payload.role });
                    setToken(storedToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                } else {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    delete axios.defaults.headers.common['Authorization'];
                }
            } catch (e) {
                console.error("Failed to decode token", e);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
                delete axios.defaults.headers.common['Authorization'];
            }
        } else {
            setToken(null);
            setUser(null);
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuthStatus();
        window.addEventListener('popstate', checkAuthStatus);
        const handleStorageChange = (event) => {
            if (event.key === 'token') {
                checkAuthStatus();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('popstate', checkAuthStatus);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            const payload = JSON.parse(atob(res.data.token.split('.')[1]));
            setUser({ id: payload.id, role: payload.role });
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            navigate('/dashboard');
        } catch (error) {
            //console.error(error);
            console.error('Login failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    });

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, authAxios }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
