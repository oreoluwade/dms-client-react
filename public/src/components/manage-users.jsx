import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { standardizeDate } from '../util';

function ManageUsers() {
  const { allUsers } = useContext(UserContext);

  return (
    <div className="row mt-5 justify-content-center">
      {allUsers &&
        allUsers.map(user => (
          <div className="col-sm-8 mb-2" key={user.id}>
            <div className="card">
              <div className="card-body">
                <span className="d-flex justify-content-between">
                  <h3 className="card-title">{user.username}</h3>
                  <p className="card-title text-primary font-italic">
                    Joined on {standardizeDate(user.createdAt)}
                  </p>
                </span>
                <p className="card-text">
                  {user.documents.length
                    ? `${user.documents.length} documents saved`
                    : 'No documents yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ManageUsers;
