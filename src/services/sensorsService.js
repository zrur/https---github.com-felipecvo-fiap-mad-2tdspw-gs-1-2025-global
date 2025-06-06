import api from './api';

export const sensorsService = {
  async getAll() {
    try {
      const response = await api.get('/sensors');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensores:', error);
      throw this.handleError(error);
    }
  },

  async getByZone(zoneId) {
    try {
      const response = await api.get(`/sensors/zone/${zoneId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensores da zona:', error);
      throw this.handleError(error);
    }
  },

  async getSensorData(sensorId, period = '24h') {
    try {
      const response = await api.get(`/sensors/${sensorId}/data`, {
        params: { period }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do sensor:', error);
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
