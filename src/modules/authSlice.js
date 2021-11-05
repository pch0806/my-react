import {
    createSlice,
    createDraftSafeSelector,
    PayloadAction,
  } from '@reduxjs/toolkit';
  
  interface AuthPayload {
    loginId: string;
  }
  
  interface AuthInfo {
    accountId: string;
    accountEmail: string;
    accountNm: string;
  }
  
  interface AuthState {
    authInfo: AuthInfo;
    actionResult: string;
    isLoading: boolean;
    error: string | null;
  }
  
  const authInitialState: AuthState = {
    authInfo: {},
    actionResult: '',
    isLoading: false,
    error: null,
  };
  
  const reducers = {
    login: (state: AuthState, { payload }: PayloadAction<AuthPayload>) => {
      state.actionResult = 'LOGIN_REQ';
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state: AuthState,
      { payload }: PayloadAction<AuthState>,
    ) => {
      state.isLogin = true;
      state.authInfo = payload.loginInfo;
      state.actionResult = 'LOGIN_OK';
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.actionResult = 'LOGIN_ERR';
      state.isLoading = false;
      state.error = action.payload;
    },
    confirmToken: (state: AuthState, { payload }: PayloadAction<AuthPayload>) => {
      state.actionResult = 'CONFIRM_TOKEN_REQ';
      state.isLoading = true;
      state.error = null;
    },
    confirmTokenSuccess: (
      state: AuthState,
      { payload }: PayloadAction<AuthState>,
    ) => {
      state.isLogin = true;
      state.authInfo = payload.loginInfo;
      state.actionResult = 'CONFIRM_TOKEN_OK';
      state.isLoading = false;
      state.error = null;
    },
    confirmTokenFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.actionResult = 'CONFIRM_TOKEN_ERR';
      state.isLoading = false;
      state.error = action.payload;
    },
    token: (state: AuthState) => {
      state.isLoading = true;
      state.actionResult = 'TOKEN_REQ';
      state.error = '';
    },
    tokenSuccess: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
      state.isLogin = true;
      state.authInfo = payload.loginInfo;
      state.isLoading = false;
      state.actionResult = 'TOKEN_OK';
      state.error = '';
    },
    tokenFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.isLogin = false;
      state.isLoading = false;
      state.actionResult = 'TOKEN_ERR';
      state.error = action.payload;
    },
    logout: (state: AuthState, { payload }: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
      state.actionResult = 'LOGOUT_REQ';
      state.error = '';
    },
    logoutSuccess: (state: AuthState) => {
      state.isLogin = false;
      state.userInfo = {};
      state.isLoading = false;
      state.actionResult = 'LOGOUT_OK';
      state.error = '';
    },
    logoutFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.isLogin = false;
      state.userInfo = {};
      state.isLoading = false;
      state.actionResult = 'LOGOUT_ERR';
      state.error = action.payload;
    },
    actionResultClear: (state: AuthState) => {
      state.actionResult = '';
    },
  };
  
  const slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: reducers,
  });
  
  const selectAuthInfo = createDraftSafeSelector(
    (state: AuthState) => state.authInfo,
    authInfo => authInfo,
  );
  
  const selectStatus = createDraftSafeSelector(
    (state: AuthState) => state.isLogin,
    (state: AuthState) => state.actionResult,
    (state: AuthState) => state.isLoading,
    (state: AuthState) => state.error,
    (isLogin, actionResult, isLoading, error) => ({ isLogin, actionResult, isLoading, error }),
  );
  
  export const authSelector = {
    authInfo: state => selectAuthInfo(state[AUTH]),
    status: state => selectStatus(state[AUTH]),
  };
  
  export const AUTH = slice.name;
  export const authReducer = slice.reducer;
  export const authAction = slice.actions;
  