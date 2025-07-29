import api from './apiConfig';

export const login = async (username, password) => {
  return api.post('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  });
};

export const refreshToken = async (refreshToken) => {
  return api.post('/auth/refresh', {
    refreshToken,
    expiresInMins: 30,
  });
};

export const getCurrentUser = async () => {
  return api.get('/auth/me');
};