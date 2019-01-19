import * as actions from '../../actions/notificationActions';
import * as types from '../../actionTypes/notificationActionTypes';


describe('Success notification action', () => {
  it('should return success action type', () => {
    expect(actions.successNotification('success message')).toEqual({
      type: types.SUCCESS_NOTIFICATION,
      payload: 'success message',
    });
  });
});

describe('Error notification action', () => {
  it('should return error action type', () => {
    expect(actions.errorNotication('error message')).toEqual({
      type: types.ERROR_NOTIFICATION,
      payload: 'error message',
    });
  });
});

describe('Clean up action', () => {
  it('should return clean up action', () => {
    expect(actions.cleanUp()).toEqual({
      type: types.CLEAN_UP,
    });
  });
});
