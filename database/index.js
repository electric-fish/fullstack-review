const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  name: String,
  url: String,
  ownerId: Number,
  ownerName: String,
  count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('Running mongoose.save...');
  console.log('Data:', data);

  let savePromise = new Promise((resolve, reject) => {
    Repo.exists()
    .then( (result) => {
      console.log(result);
      if (!result) {
        Repo.insertMany(data, (error, docs) => {
          console.log('Insert into empty database.')
          resolve();
        });
      } else {
        Repo.deleteMany( {ownerId: data[0].ownerId}, (error) => {
          Repo.insertMany(data, (error, docs) => {
            console.log('Insert into existing database.')
            // console.log(docs);
            resolve();
          });
        });
      }
    });
  });

  return savePromise;
}

let query = () => {
  console.log('Database running query...');

  let dataPromise = new Promise((resolve, reject) => {
    const query = Repo.find();
    query.sort({count: -1});
    query.limit(25);
    query.find({}, (err, docs) => {
      console.log(docs);
      resolve(docs);
    });
  });

  return dataPromise;

  // const query = Repo.find();
  // query.sort({count: -1});
  // query.limit(25);
  // query.find({}, (err, docs) => {
  //   console.log(err);
  //   console.log(docs);
  // });
}



module.exports.save = save;
module.exports.query = query;