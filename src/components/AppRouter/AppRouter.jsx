import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'pages/NotFound';

const Router = ({ routes }) => (
  <Switch>
    {routes.map(({ path, exact, render }) => (
      <Route key={path} exact={exact} path={path} render={render} />
    ))}
    <Route path="*" exact component={NotFound} />
  </Switch>
);

Router.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Router;
