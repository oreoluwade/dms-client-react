import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import HomePage from './homepage';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
