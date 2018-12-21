import { all } from 'redux-saga/effects';

import watchSignup from './signupSaga';
import watchLogin from './loginSaga';


function* rootSaga() {
  yield all([
    watchSignup(),
    watchLogin(),
  ]);
}

export default rootSaga;
