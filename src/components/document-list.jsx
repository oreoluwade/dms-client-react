import React from 'react';
import PropTypes from 'prop-types';

const renderContentPart = content => {
  return content && content.length > 50
    ? `${content.slice(0, 60)}...`
    : content;
};

function DocumentList({ documents }) {
  return (
    <div className="row mt-5">
      {documents.map(document => (
        <div className="col-sm-4 mb-2" key={document.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-primary">{document.title}</h5>
              <p className="card-text">{renderContentPart(document.content)}</p>
              <a href="#" className="btn btn-primary">
                See more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

DocumentList.propTypes = {
  documents: PropTypes.array
};

export default DocumentList;
