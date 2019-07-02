import React from 'react';
import ReactDOM from 'react-dom';

const title = 'The document management system';

ReactDOM.render(<div>{title}</div>, document.getElementById('app'));

module.hot.accept();
