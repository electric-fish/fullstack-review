const request = require('request');
const config = require('../config.js');
const model = require('../server/model.js');

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
      // console.log(response);
      // console.log('===============');
      // console.log(response.headers);
      // console.log(response.headers.status);

      let repos = JSON.parse(body).items;
      let data = [];

      if (repos !== undefined) {
        for (var i = 0; i < repos.length; i++) {
          let obj = {
            _id: repos[i].id,
            name: repos[i].name,
            url: repos[i].html_url,
            ownerId: repos[i].owner.id,
            ownerName: repos[i].owner.login,
            avatar_url: repos[i].owner.avatar_url,
            count: repos[i].stargazers_count + repos[i].watchers_count + repos[i].forks_count
          }
          data.push(obj);
        }
        if (repos.length <= 0) {
          console.log('No entries found, no need to insert.');
          reject('No entries found, no need to insert.');
        } else {
          model.insert(data)
          .then( result => {
            resolve();
          })
        }
      } else {
        console.log('ERROR!!!!!!');
        reject('Error: The listed users and repositories cannot be searched either because the resources do not exist or you do not have permission to view them.');
      }

    });
  });

  return getRepoPromise;
}

module.exports.getReposByUsername = getReposByUsername;