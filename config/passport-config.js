const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
  
var User            = require('../models/user');
var config = require('./auth-config');
const bcrypt = require('bcrypt');

module.exports = function(passport) {  
    passport.use(new LocalStrategy({
            usernameField: 'email',
        },
        function(username, password, done) {

            User.findOne({ email: username})
            .then(function(user){
                if(!user){
                    return done("Not found", null);
                }

                return bcrypt.compare(password, user.password)
                .then(function(res) {
                    if(res == true){
                        return done(null, jwt.encode({ id: user.id, email: user.email }, config.secret));
                    }

                    return done("Bad PW", null);
                });
            })
            .catch(err => done(err, null)); 
    }));

    passport.use(new BearerStrategy((token, done) => {
        try {
          const { username } = jwt.decode(token, config.secret);
          if (username == "eheitmuller@gmail.com" && password=="test") {
            done(null, username);
            return;
          }
          done(null, false);
        } catch (error) {
          done(null, false);
        }
      }));

};