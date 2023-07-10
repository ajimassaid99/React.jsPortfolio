// productActions.js

import axios from 'axios';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from './constants';

const API_BASE_URL = 'https://nice-pear-spider-boot.cyclic.app/api';

export const getProducts = (search,cat,tags,skip,limit) => {
  return  (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try {
      setTimeout(async()=>{
      const response = await axios.get(`${API_BASE_URL}/products?search=${search}&category=${cat}&tags=${tags}&skip=${skip}&limit=${limit}`);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
      },2000);
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

