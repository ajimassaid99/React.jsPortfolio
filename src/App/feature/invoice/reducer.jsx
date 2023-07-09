import {
    GET_INVOICE_REQUEST,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAILURE
  } from './constants';
  
  const initialState = {
    loading: false,
    invoiceData: null,
    error: null
  };
  
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INVOICE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case GET_INVOICE_SUCCESS:
        return {
          ...state,
          loading: false,
          invoiceData: action.payload,
          error: null
        };
      case GET_INVOICE_FAILURE:
        return {
          ...state,
          loading: false,
          invoiceData: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;