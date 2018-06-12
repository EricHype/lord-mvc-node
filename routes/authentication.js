
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

var User = require('../models/user');
var config = require('../config/auth-config');
var Promise = require('bluebird');


module.exports = function(routes, passport) {
  
  routes.post('/authenticate', passport.authenticate('local', { session: false }), function(req, res) {
    return res.json(req.user);
  });
  
  routes.post('/register', function(req, res){
      const saltRounds = 10;
      
      if(!req.body.password || ! req.body.email){
          res.json({ code: 500, message: "No email or password specified" })
      }

      bcrypt.hash(req.body.password, saltRounds)
      .then(function(hash) {
          // Store hash in your password DB.
          return User.create({email: req.body.email, password: hash});
      }).then(function(user){
         res.redirect('/authenticate');
      })
  })
  
  
  
};