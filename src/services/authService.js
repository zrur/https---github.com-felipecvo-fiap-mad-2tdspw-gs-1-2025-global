import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem('@irrigafacil:token', token);
      await AsyncStorage.setItem('@irrigafacil:user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      console.error('Erro no login:', error);
      throw this.handleError(error);
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw this.handleError(error);
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem('@irrigafacil:token');
      await AsyncStorage.removeItem('@irrigafacil:user');
      return true;
    } catch (error) {
      console.error('Erro no logout:', error);
      return false;
    }
  },

  async getCurrentUser() {
    try {
      const userString = await AsyncStorage.getItem('@irrigafacil:user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  },

  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('@irrigafacil:token');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'Erro no servidor';
      return new Error(message);
    } else if (error.request) {
      return new Error('Erro de conexão. Verifique sua internet.');
    } else {
      return new Error('Erro inesperado. Tente novamente.');
    }
  },
};
