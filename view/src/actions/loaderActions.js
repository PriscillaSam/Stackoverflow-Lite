import {
  LOADING,
  STOP_LOADING,
} from '../actionTypes/loadingActionTypes';

export const loading = () => ({
  type: LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});
