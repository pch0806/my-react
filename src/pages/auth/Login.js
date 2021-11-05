import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { authSelector, authAction } from '../../modules/authSlice';

const Login = props => {
  const dispatch = useDispatch();
  const status = useSelector(authSelector.status);

  const [loginValidate, setLoginValidate] = useState({
    loginId: true,
    loginIdError: '',
    loginPw: true,
    loginPwError: '',
  });

  const [formValue, setFormValue] = useState({
    loginId: localStorage.getItem('loginId'),
    loginPw: '',
    idSave: localStorage.getItem('idSave') || 'Y',
  });

  useEffect(() => {
    if (status.actionResult === 'LOGIN_OK') {
      dispatch(authAction.actionResultClear());
      props.push('/dashboard');
    }
  }, [dispatch, props, status]);

  const onFormChange = useCallback(
    e => {
      const type = e.target.type;
      const name = e.target.name;
      const value = e.target.value;
      const checked = e.target.checked;
      if (type === 'checkbox') {
        setFormValue({ ...formValue, [name]: checked ? 'Y' : 'N' });
      } else {
        setFormValue({ ...formValue, [name]: value });
      }
    },
    [formValue],
  );

  const onLogin = useCallback(() => {
    const loginId = formValue.loginId;
    const loginPw = formValue.loginPw;
    const idSave = formValue.idSave;

    let validate = {};

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (loginId.trim() === '') {
      validate.loginId = false;
      validate.loginIdError = '이메일을 입력하세요.';
    } else if (!emailRegex.test(loginId)) {
      validate.loginId = false;
      validate.loginIdError = '이메일 형식을 확인해 주세요.';
    } else {
      validate.loginId = true;
      validate.loginIdError = '';
    }

    if (loginPw.trim() === '') {
      validate.loginPw = false;
      validate.loginPwError = '비밀번호를 입력하세요.';
    } else {
      validate.loginPw = true;
      validate.loginPwError = '';
    }

    setLoginValidate(validate);

    if (!validate.loginId || !validate.loginPw) {
      return;
    }

    dispatch(
      authAction.login({
        loginType: 'admin',
        loginId,
        loginPw,
        idSave,
      }),
    );
  }, [dispatch, formValue]);

  const disable =
    status.actionResult === 'LOGIN_REQ'
      ? { pointerEvents: 'none', opacity: '0.4' }
      : {};

  return (
    <Container style={disable}>
      <Title>
          MyApp
      </Title>
      <ContentBox>
        <InputArea>
          <InputBox>
            <Input
              type="text"
              name="loginId"
              value={formValue.loginId}
              placeholder=" "
              isValidate={loginValidate.loginId}
              onChange={onFormChange}
            />
            <Placeholder>
              <span>User ID</span>
            </Placeholder>
          </InputBox>
          <InputError isValidate={loginValidate.loginId}>
            {loginValidate.loginIdError}
          </InputError>
          <InputBox>
            <Input
              type="password"
              name="loginPw"
              value={formValue.loginPw}
              placeholder=" "
              isValidate={loginValidate.loginPw}
              onChange={onFormChange}
              onKeyPress={e => e.key === 'Enter' && onLogin()}
            />
            <Placeholder>
              <span>Password</span>
            </Placeholder>
          </InputBox>
          <InputError isValidate={loginValidate.loginPw}>
            {loginValidate.loginPwError}
          </InputError>
        </InputArea>
        <ServiceArea>
          <div>
            <input
              type="checkbox"
              name="idSave"
              checked={formValue.idSave === 'Y'}
              onChange={onFormChange}
            />
            &nbsp;계정 저장
          </div>
          <ServiceTools></ServiceTools>
        </ServiceArea>
        <ButtonArea>
          <LoginButton
            onClick={onLogin}
            isLoginError={status.actionResult === 'LOGIN_ERR'}
          >
            LOGIN
          </LoginButton>
          <LoginError>
            {status.actionResult === 'LOGIN_ERR' &&
              '아이디 또는 비밀번호를 확인해 주세요.'}
          </LoginError>
        </ButtonArea>
      </ContentBox>
      <BottomBox>
        <BottomLeftArea></BottomLeftArea>
        <BottomRightArea>
        </BottomRightArea>
      </BottomBox>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.grayBackground};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 1.875rem 0;

    & > svg {
      width: 15rem;
    }
  }

  @media only screen and (min-width: 769px) {
    padding: 4.375rem 0;

    & > svg {
      width: 18.125rem;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #efefef;
  border-radius: 0.9375rem;

  @media only screen and (max-width: 768px) {
    width: 22.5rem;
    padding: 0 1.25rem;
  }

  @media only screen and (min-width: 769px) {
    width: 33.5625rem;
    padding: 3.625rem 4.25rem;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;

  & > label + div {
    margin-top: 1.25rem;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 3.1875rem;

  & > input:not(:placeholder-shown) + label,
  input:focus + label {
    display: none;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0.125rem solid ${props => (props.isValidate ? '#f1f1f1' : '#f05b5b')};
  filter: ${props =>
    props.isValidate ? 'none' : 'drop-shadow(0rem 0rem 0.25rem #f05b5b);'};
  border-radius: 0.375rem;
  padding: 0 0.625rem;
  font-size: 0.9375rem;

  &:focus {
    border: 0.125rem solid
      ${props => (props.isValidate ? '#dddddd' : '#f05b5b')};
  }
`;

const Placeholder = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  padding: 0 0.625rem;
  color: #cccccc;
  font-size: 1rem;

  & > svg {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 0.875rem;
    margin-left: 0.1875rem;
    path {
      fill: #999999;
    }
  }
  & > img {
    margin-right: 0.875rem;
    margin-left: 0.1875rem;
  }
`;

const InputError = styled.label`
  height: 1.25rem;
  padding: 0.125rem 0.25rem;
  color: #f05b5b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ServiceArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0 1.25rem 0;
  font-family: Noto Sans KR;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.4375rem;
  color: #333333;
`;

const ServiceTools = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  & > :not(:last-child) {
    margin-right: 0.1875rem;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
  height: 3.75rem;
  background: #2a91df;
  border: ${props => (props.isLoginError ? '0.125rem solid #f05b5b' : 'none')};
  box-sizing: border-box;
  box-shadow: ${props =>
    props.isLoginError ? '0rem 0rem 0.375rem #f05b5b' : 'none'};
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 1.25rem;
  color: #ffffff;
`;

const LoginError = styled.label`
  height: 1.25rem;
  padding: 0.125rem 0.25rem;
  color: #f05b5b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 22.5rem;
    padding: 0.625rem 1.25rem;
  }

  @media only screen and (min-width: 769px) {
    width: 33.5625rem;
    padding: 0.625rem 4.25rem;
  }
`;

const BottomLeftArea = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 1rem;
  color: #333333;
`;

const BottomRightArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 300;
  font-size: 1rem;
  color: #333333;
`;

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps, { push })(React.memo(Login));
