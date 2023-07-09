import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth/reducer';
import productReducer from './products/reducer';
import cartReducer from './cart/reducer';
import addressesReducer from './addresses/reducer';
import orderReducer from './orders/reducer';
import invoiceReducer from './invoice/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  address: addressesReducer,
  orders: orderReducer,
  invoice: invoiceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
