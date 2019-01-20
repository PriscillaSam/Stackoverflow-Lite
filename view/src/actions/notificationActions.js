import * as types from '../actionTypes/notificationActionTypes';

export const successNotification = message => ({
  type: types.SUCCESS_NOTIFICATION,
  payload: message,
});

export const errorNotication = error => ({
  type: types.ERROR_NOTIFICATION,
  payload: error,
});

export const cleanUp = () => ({
  type: types.CLEAN_UP,
});
