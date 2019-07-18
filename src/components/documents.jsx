import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import DocumentList from './document-list';
import Loader from './loader';
import { filterDocuments } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  docsBody: {
    overflowY: 'scroll',
    maxHeight: '80vh'
  }
};

function DocumentsPage() {
  const { user, allDocuments } = useContext(UserContext);

  const [pageIsReady, setPageIsReady] = useState(false);

  useEffect(() => {
    setPageIsReady(!!user && !!allDocuments);
  }, [user, allDocuments]);

  return pageIsReady ? (
    <div className="navbar-expand-lg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#doclistContent"
        aria-controls="#doclistContent"
        aria-expanded="false"
        aria-label="Toggle documents"
      >
        <FontAwesomeIcon
          icon="bars"
          color="black"
          data-toggle="tooltip"
          title="expand"
        />
      </button>
      <div className="navbar-collapse collapse" id="doclistContent">
        <ul className="nav navbar-nav row w-100" role="tablist">
          <li className="nav-item col-sm-4 text-sm-right">
            <a
              className="nav-link active font-weight-bold text-dark"
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
          <li className="nav-item col-sm-4 text-sm-center">
            <a
              className="nav-link font-weight-bold text-dark"
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
          <li className="nav-item col-sm-4 text-sm-left">
            <a
              className="nav-link font-weight-bold text-dark"
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
      </div>
      <hr />
      <div className="tab-content" id="docsTabContent" style={styles.docsBody}>
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
    </div>
  ) : (
    <Loader />
  );
}

export default DocumentsPage;
