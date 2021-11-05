import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { authSelector } from '../modules/authSlice';

import { allFlattenRoutes as routes } from './routeSwitch';

import { history } from '../modules/store';

import MainLayout from '../pages/layout/MainLayout';
import AuthLayout from '../pages/layout/AuthLayout';

const Layout = ({ children, pathname,isLogin }) => {

  if (pathname.indexOf('/auth'|| pathname === '/' || !isLogin) >= 0) {
    return <AuthLayout children={children} />;
  } else {
    return <MainLayout children={children} />;
  }
};

const Routes = ({ pathname }) => {

  const status = useSelector(authSelector.status);

  return (
    <ConnectedRouter history={history}>
      <Suspense fallback={<div></div>}>
      <Layout pathname={pathname}>
        <Switch>
          {routes.map((route, index) => {
            return (
              !route.children && (
                <route.route
                  key={index}
                  path={route.path}
                  isLogin={status.isLogin}
                  roles={route.roles}
                  exact={route.exact}
                  component={route.component}
                />
              )
            );
          })}
          <Route render={() => <Redirect to="/" />}></Route>
        </Switch>
      </Layout>
      </Suspense>
    </ConnectedRouter>
  );
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps, null)(React.memo(Routes));
