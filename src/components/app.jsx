import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import HomePage from './homepage';
import Auth from './auth/auth';
import UserProvider from '../contexts/user-provider';
import DocumentsPage from './documents';
import ProtectedRoute from './protected';
import NotFound from './not-found';
import ManageUsers from './manage-users';
import Profile from './profile';
import Statistics from './statistics';
import CreateDocumentButton from './create-document-button';
import CreateDocumentPage from './create-document-page';
import UpdateDocumentPage from './update-document-page';

const styles = {
  app: {
    backgroundColor: '#AFAFAF',
    height: '100vh'
  }
};

const App = () => {
  return (
    <div className="container-fluid text-monospace" style={styles.app}>
      <UserProvider>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path={['/login', '/signup']} component={Auth} />
              <ProtectedRoute path="/documents" component={DocumentsPage} />
              <ProtectedRoute path="/users" component={ManageUsers} />
              <ProtectedRoute path="/statistics" component={Statistics} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute
                path="/create-document"
                exact
                component={CreateDocumentPage}
              />
              <ProtectedRoute
                path="/document/:documentId"
                exact
                component={UpdateDocumentPage}
              />
              <Route component={NotFound} />
            </Switch>
            <CreateDocumentButton />
          </Fragment>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
