import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';

const loading = () => (
  <HashLoader
    css={{
      display: 'block',
      width: '100%',
      height: '100%',
      margin: '0 auto',
    }}
    color={'#41a1ea'}
    loading={true}
    size={20}
  />
);


const AuthLayout = ({ children, pathname }) => {
  return (
    <Suspense fallback={loading()}>{children}</Suspense>
  );
};

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps, null)(React.memo(AuthLayout));
