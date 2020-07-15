import React from 'react';
import Page from 'hocs/page';
import Home from 'pages/Home';
import Auth from 'pages/Auth';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    render: props => (
      <Page title="Quizer">
        <Home {...props} />
      </Page>
    ),
  },
  {
    path: '/auth/',
    exact: false,
    cache: false,
    render: props => (
      <Page title="Auth | Quizer">
        <Auth {...props} />
      </Page>
    ),
  },
];
