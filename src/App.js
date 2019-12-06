import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const App = () => (
  <Layout>
    <BurgerBuilder />
  </Layout>
);

export default App;
