const db = require('../database');

module.exports = {

  insert: function (data) {
    console.log('Model inserting into database...');
    return db.save(data);
  },

  query: function () {
    console.log('Model trying to query top 25...');
    return db.query();
  },

  insertUser: function (userData) {
    return db.saveUser(userData);
  },

  queryUser: function (userData) {
    return db.queryUser();
  },

  queryUserInfo: function (userid) {
    console.log('Model trying to query user info...');
    return db.queryUserInfo(userid);
  }

}
