import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  GET_ONE_DOCUMENT,
  UPDATE_DOCUMENT,
  GET_ALL_DOCUMENTS
} from '../queries';
import { UserContext } from '../contexts';

const styles = {
  editorContainer: {
    height: '70vh'
  },
  submitButton: {
    width: '10vw'
  }
};

function RenderDocument({ match, history }) {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [access, setAccess] = useState('');
  const [isDocumentOwner, setIsDocumentOwner] = useState(false);

  const { data, loading, error } = useQuery(GET_ONE_DOCUMENT, {
    variables: {
      id: match.params.documentId
    },
    skip: !match
  });

  useEffect(() => {
    if (user && data && data.getDocument) {
      setTitle(data.getDocument.title);
      setContent(data.getDocument.content);
      setAccess(data.getDocument.access);
      setIsDocumentOwner(data.getDocument.owner.id === user.id);
    }
  }, [user, data]);

  const handleTitleChange = e => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleAccessChange = e => {
    e.preventDefault();
    setAccess(e.target.value);
  };

  if (error) {
    return <h1>The document could not be retrieved!</h1>;
  } else {
    return loading ? (
      <h1>Loading...</h1>
    ) : (
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
              disabled={!isDocumentOwner}
            />
          </div>
          <div className="col">
            <select
              className="custom-select col"
              id="inputGroupSelect"
              value={access}
              onChange={handleAccessChange}
              disabled={!isDocumentOwner}
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
          disabled={!isDocumentOwner}
        />
        <Mutation
          mutation={UPDATE_DOCUMENT}
          onCompleted={() => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Document updated!',
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
                    id: match.params.documentId,
                    access
                  }
                });
              }}
            >
              UPDATE
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

RenderDocument.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(RenderDocument);
