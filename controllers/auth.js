const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  
  User.findById('608273a5bd1eb42cb6c07aa9')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      next();
    })
    .catch(err => console.log(err));
  res.redirect('/');
};
