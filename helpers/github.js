const request = require('request');
const config = require('../config.js');
const model = require('../server/model.js');

let getContributors = (contributors_url) => {

  let contributorOptions = {
    url: contributors_url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let getContributorPromise = new Promise((resolve, reject) => {
    request(contributorOptions, function(error, response, body) {
      let contributorsArr = [];
      let contributors = JSON.parse(body);
      for (var j = 0; j < contributors.length; j++) {
        // console.log(contributors[j]);
        let obj = {
          _id: contributors[j].id,
          name: contributors[j].login,
          avatar_url: contributors[j].avatar_url,
          html_url: contributors[j].html_url
        };
        // console.log(obj);
        contributorsArr.push(obj);
      }
      // console.log(contributorsArr);
      resolve(contributorsArr);
    });
  });

  return getContributorPromise;
}

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  console.log('Running getReposByUsername(' + username + ')...');

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/search/repositories?q=user:${username}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let getRepoPromise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      let repos = JSON.parse(body).items;
      let data = [];

      if (repos !== undefined) {
        if (repos.length <= 0) {
          console.log('No entries found, no need to insert.');
          reject('No entries found, no need to insert.');
        } else {
          let contributorsArr = [];
          for (var i = 0; i < repos.length; i++) {
            contributorsArr.push(getContributors(repos[i].contributors_url));
          }

          Promise.all(contributorsArr)
          .then( function(contributor) {
            // console.log('promise all attemptttt ', contributor);

            let data = [];
            let userData = [];

            for (var i = 0; i < repos.length; i++) {
              // console.log('repo id: ', repos[i].id)
              let contributorList = [];
              for (var j = 0; j < contributor[i].length; j++) {
                // console.log('- ', contributor[i][j]._id);
                let userObj = {
                  _id: contributor[i][j]._id,
                  name: contributor[i][j].name,
                  avatar_url: contributor[i][j].avatar_url,
                  html_url: contributor[i][j].html_url
                };

                userData.push(userObj);
                contributorList.push(contributor[i][j]._id);
              }

              let obj = {
                _id: repos[i].id,
                name: repos[i].name,
                url: repos[i].html_url,
                ownerId: repos[i].owner.id,
                ownerName: repos[i].owner.login,
                avatar_url: repos[i].owner.avatar_url,
                count: repos[i].stargazers_count + repos[i].watchers_count + repos[i].forks_count,
                contributors: contributorList,
              };

              data.push(obj);
            }

            model.insert(data)
            .then( () => {
              return model.insertUser(userData);
            })
            .then ((result) => {
              resolve(result);
            })
            .catch ( (error) => {
              reject(error);
            });

          });
        }
      } else {
        console.log('ERROR');
        reject('Error: The listed users and repositories cannot be searched either because the resources do not exist or you do not have permission to view them.');
      }

    });
  });

  return getRepoPromise;
}

module.exports.getReposByUsername = getReposByUsername;