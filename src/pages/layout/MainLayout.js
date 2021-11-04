import React from 'react';
import { connect } from 'react-redux';

const MainLayout = ({ children, pathname }) => {
  return (
    <>
      MAIN LAYOUT
      {children}
    </>
  );
};

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps, null)(React.memo(MainLayout));
