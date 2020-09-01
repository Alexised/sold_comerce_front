import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import Create_Product from './pages/Create_Product';
import My_productos from './pages/My_productos';




import './App.css'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/product/:id"
        exact
        component={Detail}
      />
      <Route
        path="/login"
        exact
        component={Login}
      />
      <Route
        path="/register"
        exact
        component={Register}
      />
        <Route
        path="/create-product"
        exact
        component={Create_Product}
      />
        <Route
        path="/my-product"
        exact
        component={My_productos}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
