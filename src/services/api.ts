import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ALTERE ESTA URL PARA SUA API
const API_BASE_URL = 'http://192.168.1.100:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@irrigafacil:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('@irrigafacil:token');
      await AsyncStorage.removeItem('@irrigafacil:user');
    }
    return Promise.reject(error);
  }
);

export default api;
