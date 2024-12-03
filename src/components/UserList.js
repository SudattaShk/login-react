import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
  // Get users from the Redux store, default to an empty array if undefined
  const users = useSelector((state) => state.auth.users || []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
