import React from 'react';
import Page from 'hocs/page';
import Home from 'pages/Home';
import Auth from 'pages/Auth';

const createRoutePage = (Component, title, additionalProps = {}) => props => (
  <Page title={title}>
    <Component {...props} {...additionalProps} />
  </Page>
);

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    render: createRoutePage(Home, 'Quizer'),
  },
  {
    path: '/auth/',
    exact: false,
    cache: false,
    render: createRoutePage(Auth, 'Auth | Quizer'),
  },
];
