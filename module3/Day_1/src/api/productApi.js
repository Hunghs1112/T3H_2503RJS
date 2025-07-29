import api from './apiConfig';

export const getProductById = async (id) => {
  return api.get(`/products/${id}`);
};

export const getProducts = async (page, limit) => {
  const skip = (page - 1) * limit;
  return api.get(`/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,description`);
};