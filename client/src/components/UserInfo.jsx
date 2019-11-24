import React from 'react';

const UserInfo = (props) => {

  console.log(props.userRepos);
  let repos = props.userRepos;
  let username = '';

  if (repos.length > 0) {
    username = repos[0].ownerName;
  }

  const repoList = repos.map( (repo) => {
    // console.log(repo.url);
    return (
      <li><a href={repo.url} target="_blank">{repo.name}</a></li>
    );
  });

  return (

    <div>
     <b>{username}</b>
      <p />
      <ul>{repoList}</ul>
      <button onClick={props.homeClickHandler}>HOME</button>
    </div>
  );
}

export default UserInfo;