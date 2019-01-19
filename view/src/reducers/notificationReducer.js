import * as types from '../actionTypes/notificationActionTypes';
import { cleanUp } from '../actions/notificationActions';

const initialState = {
  sending: false,
  error: false,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SUCCESS_NOTIFICATION:
      return {
        sending: true,
        error: false,
        message: action.payload,
      };

    case types.ERROR_NOTIFICATION:
      return {
        sending: true,
        error: true,
        message: action.payload,
      };

    case types.CLEAN_UP:
      return { ...initialState };

    default:
      return state;
  }
};
