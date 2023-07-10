import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './constants';

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST, payload: { isLoading: true } });
  setTimeout(()=>{
    axios.post('https://nice-pear-spider-boot.cyclic.app/api/login', credentials)
    .then((response) => {
      const data = response.data;
      localStorage.setItem('token', data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: { isLoading: false,user: data } });
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        dispatch({ type: LOGIN_FAILURE, payload: { isLoading: false, error: 'Email atau password salah' } });
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: { isLoading: false, error: 'Terjadi kesalahan saat login' } });
      }
    });

  },2000); 
};


export const getuser = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST, payload: { isLoading: true } });
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  setTimeout(() => {
    axios.get('https://nice-pear-spider-boot.cyclic.app/api/me', config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: LOGIN_SUCCESS, payload: { isLoading: false, user: data, token } });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: LOGIN_FAILURE, payload: { isLoading: false, error: 'Email atau password salah' } });
        } else {
          dispatch({ type: LOGIN_FAILURE, payload: { isLoading: false, error: 'Terjadi kesalahan saat login' } });
        }
      });
  }, 2000);
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST, payload: { isLoading: true } });
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  setTimeout(() => {
    axios.get('https://nice-pear-spider-boot.cyclic.app/api/logout', config)
      .then(() => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
      })
      .catch((error) => {
        alert(error);
      });
  }, 2000);
  
};