import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HashLoader from 'react-spinners/HashLoader';
import qs from 'qs';

import { authAction, authSelector } from '../../modules/authSlice';

const Token = props => {
  const dispatch = useDispatch();
  const status = useSelector(authSelector.status);

  // http://localhost:3000/auth/sso?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoic3NiQHNxaXNvZnQuY29tIiwidXNlck5tIjoiU1NCIiwiaWF0IjoxNjI2NzczNzc5LCJleHAiOjE2MjY4NjAxNzl9.O5ooXYPRBUq3stZud0KHl6HS_wSEYejpR6T1oMwIFm4
  useEffect(() => {
    const params = qs.parse(props.search, {
      ignoreQueryPrefix: true,
    });
    if (!params.t || params.t === '') {
      return;
    }
    dispatch(authAction.confirmToken({ accessToken: params.t }));
  }, [props, dispatch]);

  useEffect(() => {
    if (status.actionResult === 'CONFIRM_TOKEN_OK') {
      dispatch(authAction.actionResultClear());
      props.push('/dashboard');
    } else if (status.actionResult === 'CONFIRM_TOKEN_ERR') {
      dispatch(authAction.actionResultClear());
      props.push('/account/login');
    }
  }, [dispatch, props, status]);

  return (
    <Container>
      <HashLoader
        css={{
          display: 'block',
          width: '100%',
          height: '100%',
          margin: '0 auto',
        }}
        color={'#41a1ea'}
        loading={true}
        size={100}
      />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.grayBackground};
`;

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps, { push })(React.memo(Token));
