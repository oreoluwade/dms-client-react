import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { standardizeDate } from '../util';
import { UserContext } from '../contexts';
import { DELETE_DOCUMENT, GET_ALL_DOCUMENTS } from '../queries';
import renderContentPart from '../util/render-content-part';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary ml-2',
    cancelButton: 'btn btn-danger mr-2'
  },
  buttonsStyling: false
});

const styles = {
  openDocLink: {
    textDecoration: 'none'
  },
  deleteIcon: {
    color: 'red',
    cursor: 'pointer'
  },
  content: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  eyeIcon: {
    cursor: 'pointer'
  }
};

function DocumentList({ documents, history }) {
  const { user } = useContext(UserContext);

  const renderDocument = id => {
    history.push(`/document/${id}`);
  };

  return (
    <div className="row mt-5 d-flex justify-content-between align-items-start">
      {documents.map(document => {
        const isDocOwner = user.id === document.owner.id;

        return (
          <div
            className="col-sm-4 mt-4"
            key={document.id}
            onClick={() => {
              renderDocument(document.id);
            }}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary" style={styles.content}>
                  {document.title}
                </h5>
                <p
                  className="card-text text-dark font-weight-bold"
                  style={styles.content}
                >
                  {renderContentPart(document.content)}
                </p>
                <span className="d-flex justify-content-between align-items-center">
                  <p
                    className="font-italic text-muted m-0"
                    style={styles.content}
                  >
                    {`Created by ${
                      document.owner.username
                    } on ${standardizeDate(document.createdAt)}`}
                  </p>
                  {isDocOwner ? (
                    <span className="d-flex ml-4">
                      <Mutation
                        mutation={DELETE_DOCUMENT}
                        onCompleted={data => {
                          console.log('delete data', data);
                        }}
                        refetchQueries={() => [
                          {
                            query: GET_ALL_DOCUMENTS
                          }
                        ]}
                        onError={error => {
                          console.log('delete error', error.message);
                        }}
                      >
                        {mutate => (
                          <FontAwesomeIcon
                            icon="trash-alt"
                            className="fa-2x mr-3"
                            style={styles.deleteIcon}
                            data-toggle="tooltip"
                            title="Delete Document"
                            id="delete-icon"
                            onClick={e => {
                              e.stopPropagation();
                              swalWithBootstrapButtons
                                .fire({
                                  title: 'Are you sure?',
                                  text: "You won't be able to revert this!",
                                  type: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: 'Yes, delete',
                                  cancelButtonText: 'No, cancel!',
                                  reverseButtons: true
                                })
                                .then(async result => {
                                  if (result.value) {
                                    await mutate({
                                      variables: {
                                        id: document.id
                                      }
                                    });
                                    swalWithBootstrapButtons.fire({
                                      title: 'Document deleted',
                                      type: 'success',
                                      timer: 1500,
                                      showConfirmButton: false,
                                      toast: true
                                    });
                                  } else if (
                                    result.dismiss === Swal.DismissReason.cancel
                                  ) {
                                    swalWithBootstrapButtons.fire({
                                      position: 'top-end',
                                      title: 'Document will not be deleted',
                                      type: 'info',
                                      timer: 1000,
                                      showConfirmButton: false,
                                      toast: true
                                    });
                                  }
                                });
                            }}
                          />
                        )}
                      </Mutation>
                      <FontAwesomeIcon
                        className="fa-2x"
                        color="green"
                        icon="eye"
                        data-toggle="tooltip"
                        title="Edit Document"
                        style={styles.eyeIcon}
                      />
                    </span>
                  ) : (
                    <FontAwesomeIcon
                      className="fa-2x ml-4"
                      color="black"
                      icon="eye"
                      data-toggle="tooltip"
                      title="Open Document"
                      style={styles.eyeIcon}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

DocumentList.propTypes = {
  documents: PropTypes.array,
  history: PropTypes.object
};

export default withRouter(DocumentList);
