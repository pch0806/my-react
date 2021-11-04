import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const Main = React.lazy(() => import('../pages/main/Main'));

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route {...rest}>
      <Component />
    </Route>
  );
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
      // roles: ['Admin', 'User'],
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

const allRoutes = [rootRoute, mainRoute];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allFlattenRoutes };
