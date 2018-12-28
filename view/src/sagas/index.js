import { all } from 'redux-saga/effects';

import watchSignup from './signupSaga';
import watchLogin from './loginSaga';
import watchGetQuestions from './getQuestionsSaga';
import watchGetQuestion from './getQuestionSaga';
import watchProfile from './getProfileSaga';
import watchPostAnswer from './postAnswerSaga';

function* rootSaga() {
  yield all([
    watchSignup(),
    watchLogin(),
    watchGetQuestions(),
    watchGetQuestion(),
    watchProfile(),
    watchPostAnswer(),
  ]);
}

export default rootSaga;
