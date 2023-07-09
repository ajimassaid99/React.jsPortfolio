import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT } from './constants';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, isLoading: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, user: null, token: null, isLoading: false, error: action.payload };
      case LOGOUT:
        return{
          initialState
        }
    default:
      return state;
  }
};

export default authReducer;