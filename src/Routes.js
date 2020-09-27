import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Article from './pages/article';
import GlobalFeed from './pages/globalFeed';
import Authentication from './pages/authentication';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/article/:slug">
        <Article />
      </Route>
      <Route path="/" exact>
        <GlobalFeed />
      </Route>
      <Route path="/login" exact>
        <Authentication />
      </Route>
    </Switch>
  );
};

export default Routes;
