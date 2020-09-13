import React from 'react';
import Layout from '../../components/Layout/Layout';
import Authentication from '../../components/Authentication/Authentication';
import AuthenticationProvider from '../../context/AuthProvider/AuthProvider';

const ItemsPage = () => (
  <Layout>
    <AuthenticationProvider>
      <Authentication />
    </AuthenticationProvider>
  </Layout>
);

export default ItemsPage;
