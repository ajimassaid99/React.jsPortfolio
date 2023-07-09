import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api'; 

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
