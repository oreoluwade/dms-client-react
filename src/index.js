import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles.css';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPencilAlt,
  faFolderOpen,
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
// import App from './components/app';
const App = lazy(() =>
  import(/* webpackChunkName: "app" */ './components/app')
);
import client from './apollo-client';

library.add(faPencilAlt, faFolderOpen, faEdit, faTrashAlt);

render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
