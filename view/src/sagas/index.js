import { all } from 'redux-saga/effects';

import watchSignup from './signupSaga';
import watchLogin from './loginSaga';
import watchGetQuestions from './getQuestionsSaga';
import watchGetQuestion from './getQuestionSaga';
import watchProfile from './getProfileSaga';
import watchPostAnswer from './postAnswerSaga';
import watchPostQuestion from './postQuestionSaga';

function* rootSaga() {
  yield all([
    watchSignup(),
    watchLogin(),
    watchGetQuestions(),
    watchGetQuestion(),
    watchProfile(),
    watchPostAnswer(),
    watchPostQuestion(),
  ]);
}

export default rootSaga;
