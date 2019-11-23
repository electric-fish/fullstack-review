const github = require('../helpers/github.js');
const model = require('../server/model.js');

module.exports = {

  getGitHub: function (username) {
    console.log("Controller searching '"+ username + "'...");
    return github.getReposByUsername(username);
  },

  query: function () {
    console.log('Controller trying to query top 25...');
    return model.query();
    //return a promise
  }

}