import api from './apiConfig';

export const getCartById = async (cartId) => {
  return api.get(`/carts/${cartId}`);
};

export const getCartsByUser = async (userId) => {
  return api.get(`/carts/user/${userId}`);
};

export const addCart = async (userId, products) => {
  return api.post('/carts/add', { userId, products });
};

export const updateCart = async (cartId, products, merge = true) => {
  return api.put(`/carts/${cartId}`, { merge, products });
};

export const deleteCart = async (cartId) => {
  return api.delete(`/carts/${cartId}`);
};