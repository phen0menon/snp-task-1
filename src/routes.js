import React from 'react';
import Page from 'hocs/page';
import Home from 'pages/Home';
import Auth from 'pages/Auth';
import Quiz from 'pages/Quiz';

// TOOD: Move it to AppRouter
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
  {
    path: '/quiz/:id',
    exact: false,
    cache: false,
    render: createRoutePage(Quiz, 'Quiz'),
  },
];
