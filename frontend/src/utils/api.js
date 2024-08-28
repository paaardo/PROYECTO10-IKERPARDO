import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',  // Cambia esto si tu backend está en otro dominio
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las solicitudes si está presente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
