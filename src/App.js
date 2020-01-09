import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

const App = () => (
  <Layout>
    <Switch>
      {/* No need to use Switch and exact, just showing both possibilities  */}
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  </Layout>
);

export default App;
