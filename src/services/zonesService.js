import api from './api';

export const zonesService = {
  async getAll() {
    try {
      const response = await api.get('/zones');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar zonas:', error);
      throw this.handleError(error);
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/zones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar zona:', error);
      throw this.handleError(error);
    }
  },

  async create(zoneData) {
    try {
      const response = await api.post('/zones', zoneData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar zona:', error);
      throw this.handleError(error);
    }
  },

  async update(id, zoneData) {
    try {
      const response = await api.put(`/zones/${id}`, zoneData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar zona:', error);
      throw this.handleError(error);
    }
  },

  async delete(id) {
    try {
      await api.delete(`/zones/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao deletar zona:', error);
      throw this.handleError(error);
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
