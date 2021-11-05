import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HashLoader from 'react-spinners/HashLoader';

import { authSelector, authAction } from '../../modules/authSlice';

const Logout = props => {
  const dispatch = useDispatch();
  const authInfo = useSelector(authSelector.authInfo);
  const status = useSelector(authSelector.status);

  useEffect(() => {
    dispatch(authAction.logout());
  }, [dispatch, authInfo]);

  useEffect(() => {
    if (
      status.actionResult === 'LOGOUT_OK' ||
      status.actionResult === 'LOGOUT_ERR'
    ) {
      dispatch(authAction.actionResultClear());
      props.push('/auth/login');
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
  height: 100%;
  padding: 6.25rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.grayBackground};
`;

export default connect(null, { push })(React.memo(Logout));
