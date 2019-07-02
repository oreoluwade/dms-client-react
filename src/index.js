import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
