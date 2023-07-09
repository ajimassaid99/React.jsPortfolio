
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  UPDATE_QUANTITY
} from './constants';

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
      };
    case UPDATE_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      case UPDATE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                    x.product._id === action.payload.id ? { ...x, quantity: action.payload.quantity } : x
                ),
            };
    default:
      return state;
  }
};

export default cartReducer;
