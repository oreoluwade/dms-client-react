import React, { useEffect } from 'react';

const styles = {
  textContent: {
    overflow: 'hidden',
    whitespace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  detailsCard: {
    backgroundColor: '#AFAFAF',
    height: '150px'
  }
};

function HomePage() {
  useEffect(() => {
    document.title = 'Welcome';
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="card mt-5 text-center">
            <div className="card-body">
              <h1 className="card-text mt-5 mb-8 font-weight-bold">
                The Document Management System
              </h1>
              <br />
              <br />
              <div className="row justify-content-around">
                <div className="col-sm-4 card mb-3" style={styles.detailsCard}>
                  <span className="mt-auto mb-auto">
                    Create and Save Documents
                  </span>
                </div>
                <div className="col-sm-4 card" style={styles.detailsCard}>
                  <span className="mt-auto mb-auto">
                    View documents depending on privacy or role status
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
