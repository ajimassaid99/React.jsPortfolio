// productActions.js

import axios from 'axios';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from './constants';

const API_BASE_URL = 'http://localhost:3002/api'; // URL dasar API

export const getProducts = () => {
  return  (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try {
      setTimeout(async()=>{
      const response = await axios.get(`${API_BASE_URL}/products`);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
      },2000);
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

