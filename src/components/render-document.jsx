import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GET_ALL_DOCUMENTS } from '../queries';

const styles = {
  editorContainer: {
    minHeight: '70vh'
  },
  submitButton: {
    width: '10vw'
  },
  titleField: {
    height: '3rem',
    fontSize: '1.5rem'
  }
};

function RenderDocument({
  history,
  location,
  alertTitle,
  isDocumentOwner,
  handleAccessChange,
  handleTitleChange,
  documentTitle,
  documentAccessType,
  documentBody,
  mutation,
  handleDocumentDataChange,
  mutationType,
  variables,
  onCompletedCallback
}) {
  const isCreateDocumentPage = location.pathname === '/create-document';

  return (
    <div
      className="container d-flex flex-column mr-auto ml-auto mt-5 bg-light"
      style={styles.editorContainer}
    >
      <div className="row pl-0 pr-0 mt-3 mb-2">
        <div className="col-9 pr-0">
          <input
            type="text"
            className="form-control"
            placeholder="Document Title..."
            aria-label="Title"
            aria-describedby="document title"
            value={documentTitle}
            onChange={handleTitleChange}
            disabled={!isDocumentOwner && !isCreateDocumentPage}
            style={styles.titleField}
          />
        </div>
        <div className="col">
          <select
            className="custom-select col"
            id="inputGroupSelect"
            value={documentAccessType}
            onChange={handleAccessChange}
            disabled={!isDocumentOwner && !isCreateDocumentPage}
            style={styles.titleField}
          >
            <option defaultValue>Select Document Access Level</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="ROLE">ROLE</option>
          </select>
        </div>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={documentBody}
        onInit={editor => {
          // "editor" available when needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={handleDocumentDataChange}
        disabled={!isDocumentOwner && !isCreateDocumentPage}
      />
      {isDocumentOwner || isCreateDocumentPage ? (
        <Mutation
          mutation={mutation}
          onCompleted={() => {
            if (onCompletedCallback) {
              onCompletedCallback();
            }
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: alertTitle,
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });
            history.push('/documents');
          }}
          refetchQueries={() => [
            {
              query: GET_ALL_DOCUMENTS
            }
          ]}
          onError={error => {
            console.log('error', error.message);
          }}
        >
          {(mutate, { loading }) => (
            <button
              type="button"
              className="btn btn-primary btn-lg mt-3 ml-auto mr-0 mb-3"
              style={styles.submitButton}
              onClick={async event => {
                event.preventDefault();
                await mutate({ variables });
              }}
              disabled={loading}
            >
              {mutationType}
            </button>
          )}
        </Mutation>
      ) : (
        <span className="mr-3 ml-auto font-italic text-info">
          This document is Read only
        </span>
      )}
    </div>
  );
}

RenderDocument.propTypes = {
  history: PropTypes.object,
  alertTitle: PropTypes.string,
  isDocumentOwner: PropTypes.bool,
  handleAccessChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  documentTitle: PropTypes.string,
  documentAccessType: PropTypes.string,
  documentBody: PropTypes.string,
  mutation: PropTypes.object,
  handleDocumentDataChange: PropTypes.func.isRequired,
  mutationType: PropTypes.string,
  variables: PropTypes.object,
  location: PropTypes.object,
  onCompletedCallback: PropTypes.func
};

export default withRouter(RenderDocument);
