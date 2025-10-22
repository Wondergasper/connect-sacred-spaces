// src/services/authService.ts
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  church?: string;
  denomination: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  church: string;
  denomination: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token, ...userData } = response.data;
    
    // Store token in localStorage
    if (token) {
      localStorage.setItem('token', token);
    }
    
    return { token, ...userData };
  },

  register: async (userData: RegisterData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};