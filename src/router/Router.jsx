import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { getToken } from '../utils/tokenManager';
import AuthenticationPage from '../pages/AuthenticationPage/AuthenticationPage';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/auth">
        <AuthenticationPage />
      </Route>
      {getToken() ? (
        routes
          .filter(({ path }) => path !== '/auth')
          .map(({ path, component }, index) => (
            <Route exact key={index} path={path}>
              {component}
            </Route>
          ))
      ) : (
        <Redirect to="/auth" />
      )}
    </Switch>
  </BrowserRouter>
);
