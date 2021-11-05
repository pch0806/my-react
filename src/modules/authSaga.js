import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { authAction } from './authSlice';

import * as authApiLib from '../lib/authApi';

function* login({ payload }) {
  try {
    const loginInfo = yield call(authApiLib.login, payload);

    localStorage.setItem('accessToken', loginInfo.accessToken);

    yield put(authAction.loginSuccess({ loginInfo }));
  } catch (err) {
    yield put(authAction.loginFailure('Login Error'));
  }
}

function* confirmToken({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw Object.assign(new Error('token error'), { status: 401 });
    }

    const data = {
      accessToken: accessToken,
    };

    const loginInfo = yield call(authApiLib.confirmToken, data);

    yield put(authAction.confirmTokenSuccess({ loginInfo }));
  } catch (err) {
    yield put(authAction.confirmTokenFailure('Confirm Token Error'));
  }
}

function* handleToken() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw Object.assign(new Error('token error'), { status: 401 });
    }

    const data = {
      accessToken: accessToken,
    };

    const loginInfo = yield call(authApiLib.confirmToken, data);

    yield put(authAction.tokenSuccess({ loginInfo }));
  } catch (err) {
    localStorage.removeItem('accessToken');
    yield put(authAction.tokenFailure('Token Error'));
  }
}

function* handleLogout({ payload }) {
  try {
    localStorage.removeItem('accessToken');

    yield put(authAction.logoutSuccess());
  } catch (err) {
    yield put(authAction.logoutFailure('Logout Error'));
  }
}

export function* watchLogin() {
  yield takeLatest(authAction.login, login);
}

export function* watchConfirmToken() {
  yield takeLatest(authAction.confirmToken, confirmToken);
}

export function* watchToken() {
  yield takeLatest(authAction.token, handleToken);
}

export function* watchLogout() {
  yield takeLatest(authAction.logout, handleLogout);
}

function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchConfirmToken),
    fork(watchToken),
    fork(watchLogout),
  ]);
}

export default rootSaga;
