import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Logo from './Logo';
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Gallery from './Gallery';
import NotFound from './NotFound';
import Dashboard from './Dashboard';

function App() {
  return (
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
          <Route path="/photos" component={Gallery} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
