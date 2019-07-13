import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stripHtmlTags } from '../util';
import { UserContext } from '../contexts';
import RenderIconLink from './render-icon-link';
import { DELETE_DOCUMENT, GET_MY_DOCUMENTS } from '../queries';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

const styles = {
  openDocLink: {
    textDecoration: 'none'
  },
  openIcon: {
    color: 'black'
  },
  deleteIcon: {
    color: 'red'
  },
  editIcon: {
    color: 'green'
  }
};

const renderContentPart = content => {
  const normalizedText = stripHtmlTags(content);
  return normalizedText && normalizedText.length > 50
    ? `${normalizedText.slice(0, 60)}...`
    : normalizedText;
};

function DocumentList({ documents }) {
  const { user } = useContext(UserContext);

  return (
    <div className="row mt-5">
      {documents.map(document => {
        const isDocOwner = user.id === document.owner.id;

        return (
          <div className="col-sm-4 mb-2" key={document.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary">{document.title}</h5>
                <p className="card-text">
                  {renderContentPart(document.content)}
                </p>
                {isDocOwner ? (
                  <span className="d-flex float-right">
                    <Mutation
                      mutation={DELETE_DOCUMENT}
                      onCompleted={data => {
                        console.log('delete data', data);
                      }}
                      refetchQueries={() => [
                        {
                          query: GET_MY_DOCUMENTS
                        }
                      ]}
                      onError={error => {
                        console.log('delete error', error.message);
                      }}
                    >
                      {mutate => (
                        <FontAwesomeIcon
                          icon="trash-alt"
                          className="fa-2x"
                          style={styles.deleteIcon}
                          data-toggle="tooltip"
                          title="Delete Document"
                          onClick={() => {
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
                    <RenderIconLink
                      document={document}
                      iconStyle={styles.editIcon}
                      iconClass="fa-2x ml-4"
                      icon="edit"
                      iconTitleTip="Edit Document"
                    />
                  </span>
                ) : (
                  <RenderIconLink
                    document={document}
                    iconStyle={styles.openIcon}
                    iconClass="fa-2x"
                    icon="folder-open"
                    iconTitleTip="Open Document"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

DocumentList.propTypes = {
  documents: PropTypes.array
};

export default DocumentList;
