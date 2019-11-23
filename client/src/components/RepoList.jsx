import React from 'react';

const RepoList = (props) => {
  const repos = props.repos;
  // console.log(repos);
  const repoList = repos.map( (repo) => {
    console.log(repo.url);
    return (
      <tr>
        <td><img className="img_avatar" src={repo.avatar_url} /></td>
        <td>
          <table><tbody>
            <tr><td>name: <a href={repo.url} target="_blank">{repo.name}</a></td></tr>
            <tr><td>user: {repo.ownerName}</td></tr>
          </tbody></table>
        </td>
      </tr>
    );
  });
  console.log(repoList);

  var imgsrc = 'https://avatars2.githubusercontent.com/u/55995360';
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {/* <ul>{repoList}</ul> */}


      <table><tbody>
        {repoList}
      </tbody></table>

    </div>
  );
}

export default RepoList;