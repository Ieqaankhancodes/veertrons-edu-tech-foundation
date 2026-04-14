import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/admin/login`, { username, password });
      if (response.data.success) {
        setToken(response.data.token);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        message: String(error?.response?.data?.error || error?.response?.data?.message || 'Login failed')
      };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
