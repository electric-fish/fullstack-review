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
      let repos = JSON.parse(body).items;
      let data = [];
      for (var i = 0; i < repos.length; i++) {
        let obj = {
          _id: repos[i].id,
          name: repos[i].name,
          url: repos[i].html_url,
          ownerId: repos[i].owner.id,
          ownerName: repos[i].owner.login,
          count: repos[i].stargazers_count + repos[i].watchers_count + repos[i].forks_count
        }
        data.push(obj);
      }
      if (repos.length <= 0) {
        console.log('No entries found, no need to insert.');
        reject();
      } else {
        model.insert(data);
        resolve();
      }
    });
  });

  return getRepoPromise;

  // request(options, function (error, response, body) {
  //   let repos = JSON.parse(body).items;
  //   let data = [];
  //   for (var i = 0; i < repos.length; i++) {
  //     let obj = {
  //       _id: repos[i].id,
  //       name: repos[i].name,
  //       url: repos[i].html_url,
  //       ownerId: repos[i].owner.id,
  //       ownerName: repos[i].owner.login,
  //       count: repos[i].stargazers_count + repos[i].watchers_count + repos[i].forks_count
  //     }
  //     data.push(obj);
  //   }
  //   if (repos.length <= 0) {
  //     console.log('No entries found, no need to insert.');
  //   } else {
  //     model.insert(data);
  //   }
  // });

}

module.exports.getReposByUsername = getReposByUsername;