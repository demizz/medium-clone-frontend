import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Article from './pages/article';
import GlobalFeed from './pages/globalFeed';
import Authentication from './pages/authentication';
import TagFeed from './pages/PageFeed/TagFeed';
import YourFeed from './pages/YourFeed/YourFeed';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import EditArticle from './pages/EditArticle/EditArticle';
import Settings from './pages/Settings/Settings';
import UserProfile from './pages/Profile/UserProfile';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/articles/new">
        <CreateArticle />
      </Route>
      <Route exact path="/articles/:slug/edit">
        <EditArticle />
      </Route>
      <Route exact path="/articles/:slug">
        <Article />
      </Route>
      <Route path="/" exact>
        <GlobalFeed />
      </Route>
      <Route path="/feed" exact>
        <YourFeed />
      </Route>
      <Route path="/tags/:slug" exact>
        <TagFeed />
      </Route>
      <Route path="/login" exact>
        <Authentication path="/login" />
      </Route>
      <Route path="/register" exact>
        <Authentication path="/register" />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/profiles/:slug">
        <UserProfile />
      </Route>
      <Route exact path="/profiles/:slug/favorites">
        <UserProfile />
      </Route>
    </Switch>
  );
};

export default Routes;
