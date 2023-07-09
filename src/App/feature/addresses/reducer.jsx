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
  
  const initialState = {
    loading: false,
    addresses: [],
    error: null,
  };
  
  const addressesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ADDRESS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: action.payload,
        };
      case GET_ADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_ADDRESS_SUCCESS:
      const updatedAddressList = state.addresses.filter((address) => address.id !== action.payload);
      return {
        ...state,
        loading: false,
        addressList: updatedAddressList,
      };
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_ADDRESS_SUCCESS:
      const newAddressList = [...state.addresses, action.payload];
      return {
        ...state,
        loading: false,
        addressList: newAddressList,
      };
    case ADD_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default addressesReducer;