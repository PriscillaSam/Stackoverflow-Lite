import { all } from 'redux-saga/effects';

import watchSignup from './signupSaga';
import watchLogin from './loginSaga';
import watchGetQuestions from './getQuestionsSaga';

function* rootSaga() {
  yield all([
    watchSignup(),
    watchLogin(),
    watchGetQuestions(),
  ]);
}

export default rootSaga;
