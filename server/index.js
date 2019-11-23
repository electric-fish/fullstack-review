const express = require('express');
const parser = require('body-parser');

const controller = require('./controller.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body;
  console.log("Searching '" + req.body + "'...");

  controller.getGitHub(username)
  .then( (result) => {
    res.status(200).send('Server insertion to database complete.');
  })
  .catch( (error) => {
    res.status(404).send(JSON.stringify(error));
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // let data = controller.query(); //return a promise
  controller.query()
  .then( (result) => {
    // console.log(result);
    res.status(200).send(JSON.stringify(result));
  })
  .catch( (error) => {
    res.status(404).send(JSON.stringify(error));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

