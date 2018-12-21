import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';

export default combineReducers({
  signUp: signupReducer,
  logIn: loginReducer,
});
