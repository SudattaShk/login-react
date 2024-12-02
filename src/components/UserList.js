import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="userlist-container">
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
