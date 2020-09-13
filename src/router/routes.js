import React from 'react';
import ItemsPage from '../pages/ItemsPage/ItemsPage';
import AuthenticationPage from '../pages/AuthenticationPage/AuthenticationPage';

export default [
  { path: '/auth', component: <AuthenticationPage /> },
  { path: '/', component: <AuthenticationPage /> },
  { path: '/items', component: <ItemsPage /> },
];
