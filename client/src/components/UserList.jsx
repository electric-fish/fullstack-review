import React from 'react';

const UserList = (props) => {
  const users = props.users;

  const userList = users.map( (user) => {
    // console.log(user);
    return (
      <li>{user.name}</li>
    );
  });

  return (
    <div>
      <h4> User List </h4>
      <ul>{userList}</ul>
    </div>
  );
}

export default UserList;