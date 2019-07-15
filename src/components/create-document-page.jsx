import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CREATE_DOCUMENT } from '../queries';
import RenderDocument from './render-document';

function CreateDocumentPage() {
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
    <RenderDocument
      alertTitle="Document Saved!"
      onCompletedCallback={resetFields}
      handleAccessChange={handleAccessChange}
      handleTitleChange={handleTitleChange}
      documentTitle={title}
      documentAccessType={access}
      documentBody={content}
      mutation={CREATE_DOCUMENT}
      handleDocumentDataChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
      variables={{
        title,
        content,
        access
      }}
      mutationType="SAVE"
    />
  );
}

CreateDocumentPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateDocumentPage);
