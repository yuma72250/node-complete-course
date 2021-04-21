const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dataLink = require('../util/mdp').dataLink;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(dataLink, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected !');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found !';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
