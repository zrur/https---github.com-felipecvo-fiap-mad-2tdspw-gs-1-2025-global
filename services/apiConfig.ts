// services/apiConfig.ts
import { Platform } from 'react-native';

// Configurações para diferentes ambientes
const API_CONFIGS = {
  // Configuração para Java Spring Boot
  java: {
    local: {
      android: 'http://10.0.2.2:8080/api',
      ios: 'http://localhost:8080/api',
      device: 'http://192.168.1.100:8080/api', // Substitua pelo seu IP
    },
    production: 'https://sua-api-producao.com/api'
  },
  
  // Configuração para .NET
  dotnet: {
    local: {
      android: 'http://10.0.2.2:5000/api',
      ios: 'http://localhost:5000/api', 
      device: 'http://192.168.1.100:5000/api', // Substitua pelo seu IP
    },
    production: 'https://sua-api-producao.com/api'
  }
};

// Escolha qual API usar (java ou dotnet)
const API_TYPE = 'java'; // Mude para 'dotnet' se preferir usar .NET

// Detecta o ambiente automaticamente
const getApiUrl = () => {
  const config = API_CONFIGS[API_TYPE];
  
  // Se estiver em desenvolvimento
  if (__DEV__) {
    // Se estiver em um dispositivo físico
    if (!Platform.select({ ios: false, android: true })) {
      return config.local.device;
    }
    
    // Se estiver em emulador/simulador
    return Platform.select({
      android: config.local.android,
      ios: config.local.ios,
      default: config.local.android
    });
  }
  
  // Se estiver em produção
  return config.production;
};

export const API_BASE_URL = getApiUrl();

// Exemplo de endpoints esperados pela API
export const API_ENDPOINTS_JAVA = {
  // Autenticação
  login: '/auth/login',
  register: '/auth/register',
  
  // Zonas
  zones: '/zones',
  zoneById: (id: number) => `/zones/${id}`,
  
  // Sensores
  sensors: '/sensors',
  sensorById: (id: number) => `/sensors/${id}`,
  sensorsByZone: (zoneId: number) => `/sensors/zone/${zoneId}`,
  
  // Irrigação
  irrigation: '/irrigation',
  startIrrigation: '/irrigation/start',
  stopIrrigation: '/irrigation/stop',
  
  // Dashboard
  stats: '/dashboard/stats',
  alerts: '/dashboard/alerts',
};

export const API_ENDPOINTS_DOTNET = {
  // Autenticação
  login: '/api/auth/login',
  register: '/api/auth/register',
  
  // Zonas
  zones: '/api/zones',
  zoneById: (id: number) => `/api/zones/${id}`,
  
  // Sensores  
  sensors: '/api/sensors',
  sensorById: (id: number) => `/api/sensors/${id}`,
  sensorsByZone: (zoneId: number) => `/api/sensors/zone/${zoneId}`,
  
  // Irrigação
  irrigation: '/api/irrigation',
  startIrrigation: '/api/irrigation/start',
  stopIrrigation: '/api/irrigation/stop',
  
  // Dashboard
  stats: '/api/dashboard/stats',
  alerts: '/api/dashboard/alerts',
};

// Exporta os endpoints corretos baseado na escolha
export const API_ENDPOINTS = API_TYPE === 'java' ? API_ENDPOINTS_JAVA : API_ENDPOINTS_DOTNET;

// Função helper para testar conexão
export const testApiConnection = async () => {
  try {
    const response = await fetch(API_BASE_URL + '/health');
    return response.ok;
  } catch (error) {
    console.error('API não está acessível:', error);
    return false;
  }
};