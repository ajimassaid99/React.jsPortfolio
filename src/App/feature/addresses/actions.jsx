import axios from 'axios';
import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
} from './constants';

const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const getAddress = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ADDRESS_REQUEST });

    setTimeout(async () => {
      try {
        const response = await axios.get('https://nice-pear-spider-boot.cyclic.app/api/DeleveryAddress', config);
        dispatch({
          type: GET_ADDRESS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_ADDRESS_FAILURE,
          payload: error.response.data,
        });
      }
    }, 2000);
  };
};

export const deleteAddress = (id) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_ADDRESS_REQUEST });
      try {

        const response= await axios.delete(`https://nice-pear-spider-boot.cyclic.app/api/DeleveryAddress/${id}`, config);
        console.log(response);
        dispatch({
          type: DELETE_ADDRESS_SUCCESS,
          payload: id,
        });
      } catch (error) {
        dispatch({
          type: DELETE_ADDRESS_FAILURE,
          payload: error.response.data,
        });
      }
    };
  };

  export const addAddress = (newAddress) => {
    return async (dispatch) => {
      dispatch({ type: ADD_ADDRESS_REQUEST });
      try {
        const response = await axios.post('https://nice-pear-spider-boot.cyclic.app/api/DeleveryAddress', newAddress, config);
        dispatch({
          type: ADD_ADDRESS_SUCCESS,
          payload: response,
        });
      } catch (error) {
        dispatch({
          type: ADD_ADDRESS_FAILURE,
          payload: error.response.data,
        });
      }
    };
  };