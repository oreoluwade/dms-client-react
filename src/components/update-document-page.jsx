import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { GET_ONE_DOCUMENT, UPDATE_DOCUMENT } from '../queries';
import { UserContext } from '../contexts';
import RenderDocument from './render-document';
import Loader from './loader';
import { standardizeDate } from '../util';

function UpdateDocument({ match }) {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [access, setAccess] = useState('');
  const [documentInfo, setDocumentInfo] = useState('');
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
      setDocumentInfo(
        `${data.getDocument.owner.username} on ${standardizeDate(
          data.getDocument.createdAt
        )}`
      );
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
      <Loader />
    ) : (
      <RenderDocument
        alertTitle="Document Updated!"
        isDocumentOwner={isDocumentOwner}
        handleAccessChange={handleAccessChange}
        handleTitleChange={handleTitleChange}
        documentTitle={title}
        documentAccessType={access}
        documentBody={content}
        mutation={UPDATE_DOCUMENT}
        handleDocumentDataChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        variables={{
          title,
          content,
          id: match.params.documentId,
          access
        }}
        mutationType="UPDATE"
        documentInfo={documentInfo}
      />
    );
  }
}

UpdateDocument.propTypes = {
  match: PropTypes.object
};

export default withRouter(UpdateDocument);
