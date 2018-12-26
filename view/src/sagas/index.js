import { all } from 'redux-saga/effects';

import watchSignup from './signupSaga';
import watchLogin from './loginSaga';
import watchGetQuestions from './getQuestionsSaga';
import watchGetQuestion from './getQuestionSaga';

function* rootSaga() {
  yield all([
    watchSignup(),
    watchLogin(),
    watchGetQuestions(),
    watchGetQuestion(),
  ]);
}

export default rootSaga;
