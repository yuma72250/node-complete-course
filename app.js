const path = require('path');

// express import
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// express app initializing
const app = express();

app.set('view engine', 'ejs'); // view engine initialization
app.set('views', 'views'); // setting up routes for the views folder

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.use((req, res, next) => {
  User.findById('608273a5bd1eb42cb6c07aa9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const dataLink = require('./util/mdp').dataLink;

mongoose
  .connect(dataLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: 'yuma',
          email: 'yuma@gmail.com',
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));
