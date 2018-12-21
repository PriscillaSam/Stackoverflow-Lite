import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
} from '../actionTypes/authActionTypes';

const initialState = {
  loggingIn: false,
  token: '',
  message: '',
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: '',
        token: '',
        message: '',
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.token,
        message: action.message,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loggingIn: false,
        token: '',
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
