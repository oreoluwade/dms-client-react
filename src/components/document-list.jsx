import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stripHtmlTags } from '../util';
import { UserContext } from '../contexts';
import RenderIconLink from './render-icon-link';

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
                    <FontAwesomeIcon
                      icon="trash-alt"
                      className="fa-2x"
                      style={styles.deleteIcon}
                      data-toggle="tooltip"
                      title="Delete Document"
                    />
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
