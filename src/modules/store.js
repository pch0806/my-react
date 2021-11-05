import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { AUTH, authReducer } from './authSlice';
import authSaga from './authSaga';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    [AUTH]: authReducer,
  });

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}

export const history = createBrowserHistory();

export default function createStore() {
  const store = configureStore({
    reducer: createRootReducer(history),
    devTools: true,
    middleware: [routerMiddleware(history), sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
