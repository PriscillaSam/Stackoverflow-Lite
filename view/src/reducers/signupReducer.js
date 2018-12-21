import {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,
} from '../actionTypes/authActionTypes';

const initialState = {
  creating: false,
  message: '',
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state, creating: true, error: '', message: '',
      };
    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state, creating: false, message: action.message, error: '',
      };
    case SIGNUP_REQUEST_FAILURE:
      return {
        ...state, creating: false, error: action.error, message: '',
      };
    default:
      return state;
  }
};

export default reducer;
