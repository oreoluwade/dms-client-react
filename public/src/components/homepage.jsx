import React, { useEffect } from 'react';

function HomePage() {
  useEffect(() => {
    document.title = 'Welcome';
  });

  return (
    <div className="container">
      <div className="card mt-5 mr-auto ml-auto mb-auto text-center">
        <h1 className="text-monospace mt-5 mb-8 font-weight-bold">
          Welcome to the Document Management System
        </h1>
        <br />
        <br />
        <div className="row pl-5 pr-5 mb-5">
          <div
            className="col card mr-5"
            style={{ backgroundColor: '#F1F1F1', height: '150px' }}
          >
            <span className="text-monospace mt-auto mb-auto">
              Create and Save Documents
            </span>
          </div>
          <div
            className="col card mr-5"
            style={{ backgroundColor: '#F1F1F1', height: '150px' }}
          >
            <span className="text-monospace mt-auto mb-auto">
              View documents depending on privacy status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
