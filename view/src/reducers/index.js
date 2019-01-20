import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import questionReducer from './singleQuestionReducer';
import profileReducer from './profileReducer';
import postAnswerReducer from './answerReducer';
import postQuestionReducer from './postQuestionReducer';
import notificationsReducer from './notificationReducer';
import loaderReducer from './loaderReducer';

export default combineReducers({
  getQuestions: questionsReducer,
  singleQuestion: questionReducer,
  userProfile: profileReducer,
  postAnswer: postAnswerReducer,
  postQuestion: postQuestionReducer,
  notifications: notificationsReducer,
  loader: loaderReducer,
});
