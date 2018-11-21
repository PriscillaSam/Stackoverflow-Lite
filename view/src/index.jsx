import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserHistory } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import Router from './router';

import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initial = {};

const store = createStore(
  reducer,
  initial,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={BrowserHistory}>
      {Router}
    </BrowserRouter>
  </Provider>, document.getElementById('index'),
);
