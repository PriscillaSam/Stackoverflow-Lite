import * as actions from '../../actions/authActions';
import * as types from '../../actionTypes/authActionTypes';

describe('Signup request action', () => {
  it('should create an action to add a user', () => {
    const body = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    const expectedAction = {
      type: types.SIGNUP_REQUEST,
      body,
    };

    expect(actions.signUpAction(body)).toEqual(expectedAction);
  });
});

describe('Login request action', () => {
  it('should return a request action', () => {
    expect(actions.loginAction({})).toEqual({
      type: types.LOGIN_REQUEST,
      payload: {},
    });
  });
});
