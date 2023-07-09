import axios from 'axios';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE
} from './constants';

const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    setTimeout(async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/orders',config);
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_FAILURE,
        payload: error.response.data.message
      });
    }
   }, 1000)
  };
};