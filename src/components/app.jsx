import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loader from './loader';
const Header = lazy(() => import(/* webpackChunkName: "header" */ './header'));
const HomePage = lazy(() =>
  import(/* webpackChunkName: "homepage" */ './homepage')
);
const Auth = lazy(() => import(/* webpackChunkName: "auth" */ './auth/auth'));
const UserProvider = lazy(() =>
  import(/* webpackChunkName: "user-provider" */ '../contexts/user-provider')
);
const DocumentsPage = lazy(() =>
  import(/* webpackChunkName: "documents" */ './documents')
);
const ProtectedRoute = lazy(() =>
  import(/* webpackChunkName: "protected" */ './protected')
);
const NotFound = lazy(() =>
  import(/* webpackChunkName: "not-found" */ './not-found')
);
const ManageUsers = lazy(() =>
  import(/* webpackChunkName: "manage-users" */ './manage-users')
);
const Profile = lazy(() =>
  import(/* webpackChunkName: "profile" */ './profile')
);
const Statistics = lazy(() =>
  import(/* webpackChunkName: "statistics" */ './statistics')
);
const CreateDocumentButton = lazy(() =>
  import(
    /* webpackChunkName: "create-document-button" */ './create-document-button'
  )
);
const CreateDocumentPage = lazy(() =>
  import(
    /* webpackChunkName: "create-document-page" */ './create-document-page'
  )
);
const UpdateDocumentPage = lazy(() =>
  import(
    /* webpackChunkName: "update-document-page" */ './update-document-page'
  )
);

const styles = {
  app: {
    backgroundColor: '#AFAFAF',
    height: '100vh',
    maxHeight: '100vh'
  },
  body: {
    height: '80vh'
  }
};

const App = () => {
  return (
    <div
      className="container-fluid text-monospace d-flex flex-column"
      style={styles.app}
    >
      <Suspense fallback={<Loader />}>
        <UserProvider>
          <Router>
            <div className="row mb-auto">
              <div className="col-sm-12">
                <Header />
              </div>
            </div>
            <div className="row" style={styles.body}>
              <div className="col-sm-12">
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
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <CreateDocumentButton />
              </div>
            </div>
          </Router>
        </UserProvider>
      </Suspense>
    </div>
  );
};

export default App;
