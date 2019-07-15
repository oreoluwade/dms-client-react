import React, { useContext, Fragment } from 'react';
import { UserContext } from '../contexts';
import DocumentList from './document-list';
import Loader from './loader';

const filterDocuments = (docs, type, user) => {
  let filtered;
  switch (type) {
    case 'PUBLIC':
      filtered = docs.filter(doc => doc.access === type);
      break;

    case 'PRIVATE':
      filtered = docs.filter(
        doc => doc.access === type && user.id === doc.owner.id
      );
      break;

    case 'ROLE':
      filtered = docs.filter(
        doc => doc.access === 'ROLE' && user.role === doc.owner.role
      );
      break;

    default:
      filtered = docs;
      break;
  }
  return filtered;
};

function DocumentsPage() {
  const { user, allDocuments } = useContext(UserContext);

  return (
    <Fragment>
      {user && allDocuments ? (
        <Fragment>
          <ul
            className="nav nav-tabs justify-content-center"
            id="docsTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="publicDocs-tab"
                data-toggle="tab"
                href="#public"
                role="tab"
                aria-controls="public"
                aria-selected="true"
              >
                PUBLIC DOCUMENTS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="privateDocs-tab"
                data-toggle="tab"
                href="#private"
                role="tab"
                aria-controls="private"
                aria-selected="false"
              >
                PRIVATE DOCUMENTS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="roleDocs-tab"
                data-toggle="tab"
                href="#role"
                role="tab"
                aria-controls="role"
                aria-selected="false"
              >
                ROLE DOCUMENTS
              </a>
            </li>
          </ul>
          <div className="tab-content" id="docsTabContent">
            <div
              className="tab-pane fade show active"
              id="public"
              role="tabpanel"
              aria-labelledby="publicDocs-tab"
            >
              <DocumentList
                documents={filterDocuments(allDocuments, 'PUBLIC', user)}
              />
            </div>
            <div
              className="tab-pane fade"
              id="private"
              role="tabpanel"
              aria-labelledby="privateDocs-tab"
            >
              <DocumentList
                documents={filterDocuments(allDocuments, 'PRIVATE', user)}
              />
            </div>
            <div
              className="tab-pane fade"
              id="role"
              role="tabpanel"
              aria-labelledby="roleDocs-tab"
            >
              <DocumentList
                documents={filterDocuments(allDocuments, 'ROLE', user)}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
}

export default DocumentsPage;
