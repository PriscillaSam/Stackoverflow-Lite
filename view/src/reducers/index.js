import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import questionsReducer from './questionsReducer';

export default combineReducers({
  signUp: signupReducer,
  logIn: loginReducer,
  getQuestions: questionsReducer,
});
