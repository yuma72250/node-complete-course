const path = require('path');

// express import
const express = require('express');

const bodyParser = require('body-parser');

// express app initializing
const app = express();

app.set('view engine', 'ejs'); // view engine initialization
app.set('views', 'views'); // setting up routes for the views folder

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('../models/products');
const User = require('../models/user');

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { contraints: true, ondelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'John', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(8000);
    })
    .catch(err => console.log(err));
