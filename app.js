const path = require('path');

// express import
const express = require('express');

const bodyParser = require('body-parser');

// express app initializing
const app = express();

app.set('view engine', 'ejs'); // view engine initialization
app.set('views', 'views'); // setting up routes for the views folder

const adminRoutes = require('./routes/admin.js');
// const shopRoutes = require('./routes/shop.js');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     console.log(user);
  //     next();
  //   })
  //   .catch(err => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
