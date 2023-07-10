// productActions.js

import axios from 'axios';
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  UPDATE_QUANTITY
} from './constants';

const API_BASE_URL = 'https://nice-pear-spider-boot.cyclic.app/api'; // URL dasar API

export const getCart = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${API_BASE_URL}/Cart`, config);
      const cart = response.data;
      console.log("aa",cart);
      dispatch({ type: GET_CART_SUCCESS, payload: cart.items });
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
  };
};

export const updateCart = (cartData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(`${API_BASE_URL}/Cart`, cartData, config);
      const updatedCart = response.data;
      console.log(updatedCart);
      dispatch({ type: UPDATE_CART_SUCCESS, payload: updatedCart });
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: UPDATE_CART_FAILURE, payload: error.message });
    }
  };
};

export const updateQuantity = (id, quantity) => (dispatch, getState) => {
  dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
};
