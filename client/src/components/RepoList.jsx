import React from 'react';

const RepoList = (props) => {
  const repos = props.repos;
  console.log(repos);
  const repoList = repos.map( (repo) => {
    console.log(repo.url);
    return (
      <li>name: <a href={repo.url} target="_blank">{repo.name}</a><br />
          user: {repo.ownerName}
      </li>
    );
  });
  console.log(repoList);
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <ul>{repoList}</ul>
    </div>
  );
}

export default RepoList;