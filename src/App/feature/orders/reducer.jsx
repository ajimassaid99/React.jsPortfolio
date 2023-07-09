import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
  } from './constants';
  
  const initialState = {
    loading: false,
    ordersList: [],
    error: null
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case GET_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          ordersList: action.payload.data,
          error: null
        };
      case GET_ORDERS_FAILURE:
        return {
          ...state,
          loading: false,
          ordersList: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;