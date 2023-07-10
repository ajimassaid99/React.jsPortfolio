import axios from 'axios';
import {
  GET_INVOICE_REQUEST,
  GET_INVOICE_SUCCESS,
  GET_INVOICE_FAILURE
} from './constants';

const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};


export const getInvoice = (invoiceId) => {
  return async (dispatch) => {
    dispatch({ type: GET_INVOICE_REQUEST });
    try {
      const response = await axios.get(`https://nice-pear-spider-boot.cyclic.app/api/invoices/${invoiceId}`,config);
      dispatch({
        type: GET_INVOICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_INVOICE_FAILURE,
        payload: error.response.data.message
      });
    }
  };
};