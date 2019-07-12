import React from 'react';
import PropTypes from 'prop-types';
import { stripHtmlTags } from '../util';

const renderContentPart = content => {
  const normalizedText = stripHtmlTags(content);
  return normalizedText && normalizedText.length > 50
    ? `${normalizedText.slice(0, 60)}...`
    : normalizedText;
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
