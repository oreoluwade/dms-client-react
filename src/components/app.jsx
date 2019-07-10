import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import HomePage from './homepage';
import Auth from './auth/auth';
import UserProvider from '../contexts/user-provider';
import Dashboard from './dashboard';
import ProtectedRoute from './protected';
import NotFound from './not-found';

const styles = {
  app: {
    backgroundColor: '#AFAFAF',
    height: '60rem'
  }
};

const App = () => {
  return (
    <UserProvider>
      <div className="container-fluid text-monospace" style={styles.app}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path={['/login', '/signup']} component={Auth} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
