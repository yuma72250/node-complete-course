const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://user0:nodecomplete@cluster0.8jnyi.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  )
    .then(result => {
      console.log('Connected !');
      callback(result);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;
