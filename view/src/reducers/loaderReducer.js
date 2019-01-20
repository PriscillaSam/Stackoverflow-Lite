import {
  LOADING,
  STOP_LOADING,
} from '../actionTypes/loadingActionTypes';

const initialState = {
  requesting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, requesting: true };

    case STOP_LOADING:
      return { ...state, requesting: false };

    default:
      return state;
  }
};
