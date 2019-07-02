import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    document.title = 'Welcome';
  });

  return (
    <div className="container">
      <h1>Welcome to the document management system</h1>
    </div>
  );
};

export default App;
