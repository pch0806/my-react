import * as apiLib from './api';

export const login = async ({ loginType, loginId, loginPw }) => {
  try {
    const data = {
      loginType: loginType,
      loginId: loginId,
      loginPw: loginPw,
    };

    const result = await apiLib.fetchApi('/auth/create-token', data);
    if (result.resultFlag) {
      return { ...result.loginInfo, accessToken: result.accessToken };
    } else {
      throw Object.assign(new Error('login error'), { status: 401 });
    }
  } catch (err) {
    throw err;
  }
};

export const confirmToken = async ({ accessToken }) => {
  try {
    const data = {
      accessToken
    };

    const result = await apiLib.fetchApi('/auth/confirm-token', data);
    if (result.resultFlag) {
      localStorage.setItem('accessToken', accessToken);
      return result.loginInfo;
    } else {
      throw Object.assign(new Error('confirm token error'), { status: 401 });
    }
  } catch (err) {
    throw err;
  }
};
