const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

  
var User            = require('../models/user');
var config = require('./auth-config');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  
  passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
      return User.findOne({email, password}).then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
  }));
  
  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.secret
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
  ));
  
};