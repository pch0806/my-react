import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
  });

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([]);
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
