import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import HomePage from './homepage';
import Auth from './auth/auth';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path={['/login', '/signup']} component={Auth} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
