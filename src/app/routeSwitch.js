import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Token = React.lazy(() => import('../pages/auth/Token'));
const Sso = React.lazy(() => import('../pages/auth/Sso'));

const Main = React.lazy(() => import('../pages/main/Main'));

const PrivateRoute = ({ component: Component,isLogin, roles, ...rest }) => {
  return (
    <Route {...rest}>
    {!isLogin ? <Token /> : <Component />}
    </Route>
  );
};

const authRoutes = {
  path: '/auth',
  name: 'Auth',
  children: [
    {
      path: '/auth/login',
      name: 'Login',
      component: Login,
      route: Route,
    },
    {
      path: '/auth/logout',
      name: 'Logout',
      component: Logout,
      route: Route,
    },
    {
      path: '/auth/sso',
      name: 'Sso',
      component: Sso,
      route: Route,
    },
  ],
};

const rootRoute = {
  path: '/',
  exact: true,
  component: () => <Redirect to="/main" />,
  route: Route,
};

const mainRoute = {
  path: '/main',
  name: 'Main',
  children: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      route: PrivateRoute,
      roles: ['Admin', 'User'],
    },
  ],
};

const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const allRoutes = [rootRoute, mainRoute, authRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allFlattenRoutes };
