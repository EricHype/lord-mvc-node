
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var User = require('../models/user');
var config = require('../config/auth-config');
var Promise = require('bluebird');

config.secret


module.exports = function(routes, passport) {
  
  
  routes.post('/authenticate', function(req, res) {
    
    passport.authenticate('local', {session: false}, (err, user, info) => {
          if (err || !user) {
              return res.status(400).json({
                  message: 'Something is not right',
                  user   : user
              });
          }
         req.login(user, {session: false}, (err) => {
             if (err) {
                 res.send(err);
             }
             // generate a signed son web token with the contents of user object and return it in the response
             const token = jwt.sign(user, config.secret);
             return res.json({user, token});
          });
      })(req, res);
  });
  
  routes.post('/register', function(req, res){
      const saltRounds = 10;
      bcrypt.hash(res.password, saltRounds)
      .then(function(hash) {
          // Store hash in your password DB.
          return User.create({email: req.email, password: hash});
      }).then(function(user){
         res.redirect('/authenticate');
      })
  })
  
  
  
};