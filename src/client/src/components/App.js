import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Logo from './Logo';
import Login from './Login';
import Navbar from './Navbar';
import NoMatch from './NoMatch';
import Dashboard from './Dashboard';
import PhotoGallery from './PhotoGallery';

const App = () => (
  <>
    <header>
      <Logo />
      <Navbar />
      <Dashboard />
    </header>
    <main>
      <Switch>
        <Redirect exact from="/" to="/photos/featured" />
        <Route exact path="/login" component={Login} />
        <Route path="/photos" component={PhotoGallery} />
        <Route component={NoMatch} />
      </Switch>
    </main>
  </>
);

export default App;
