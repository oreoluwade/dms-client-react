import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CREATE_DOCUMENT, GET_MY_DOCUMENTS } from '../queries';

const styles = {
  editorContainer: {
    height: '70vh'
  },
  submitButton: {
    width: '10vw'
  }
};

function CreateDocumentPage({ history }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [access, setAccess] = useState('PUBLIC');

  const handleTitleChange = e => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleAccessChange = e => {
    e.preventDefault();
    setAccess(e.target.value);
  };

  const resetFields = () => {
    setContent('');
    setTitle('');
  };

  return (
    <div
      className="d-flex flex-column mr-auto ml-auto mt-5 w-75 bg-light"
      style={styles.editorContainer}
    >
      <div className="row pl-0 pr-0">
        <div className="col-9 pr-0">
          <input
            type="text"
            className="form-control"
            placeholder="Document Title..."
            aria-label="Title"
            aria-describedby="document title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="col">
          <select
            className="custom-select col"
            id="inputGroupSelect"
            value={access}
            onChange={handleAccessChange}
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
        data={content}
        onInit={editor => {
          // "editor" available when needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <Mutation
        mutation={CREATE_DOCUMENT}
        onCompleted={async () => {
          await resetFields();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Document saved',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          });
          history.push('/documents');
        }}
        refetchQueries={() => [
          {
            query: GET_MY_DOCUMENTS
          }
        ]}
        onError={error => {
          console.log('error', error);
        }}
      >
        {mutate => (
          <button
            type="button"
            className="btn btn-primary btn-lg mt-3 ml-auto mr-3"
            style={styles.submitButton}
            onClick={async event => {
              event.preventDefault();
              await mutate({
                variables: {
                  title,
                  content,
                  access
                }
              });
            }}
          >
            SAVE DOCUMENT
          </button>
        )}
      </Mutation>
    </div>
  );
}

CreateDocumentPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateDocumentPage);
