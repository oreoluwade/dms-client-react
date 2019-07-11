import React, { useContext, Fragment } from 'react';
import { UserContext } from '../contexts';
import DocumentList from './document-list';

function DocumentsPage() {
  const { user, myDocuments } = useContext(UserContext);

  const filterDocuments = (docs, type) => {
    return docs && docs.filter(doc => doc.access === type);
  };

  return (
    <Fragment>
      {user && myDocuments && (
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
                documents={filterDocuments(myDocuments, 'PUBLIC')}
              />
            </div>
            <div
              className="tab-pane fade"
              id="private"
              role="tabpanel"
              aria-labelledby="privateDocs-tab"
            >
              <DocumentList
                documents={filterDocuments(myDocuments, 'PRIVATE')}
              />
            </div>
            <div
              className="tab-pane fade"
              id="role"
              role="tabpanel"
              aria-labelledby="roleDocs-tab"
            >
              <DocumentList documents={filterDocuments(myDocuments, 'ROLE')} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default DocumentsPage;
