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
  },

  queryUser: function () {
    return model.queryUser();
  },

  queryUserInfo: function(userid) {
    console.log('Controller trying to query user info...');
    return model.queryUserInfo(userid);
  }


}