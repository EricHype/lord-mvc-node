
var jwt = require('jwt-simple');
var User = require('../models/user');
var config = require('../config/auth-config');
var Promise = require('bluebird');


module.exports = function(routes, passport) {
  
  
routes.post('/authenticate', function(req, res) {
  User.findOne({ email: req.body.email}) 
  .then(function(user) {

    if (!user) {
      return res.send({success: false, msg: 'Authentication failed. User not found.'});
    } 
      // check if password matches
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        var token = jwt.encode(user, config.secret);
        // return the information including token as JSON
        return res.json({success: true, token: 'JWT ' + token});
      }
        
      return res.send({success: false, msg: 'Authentication failed. Wrong password.'});
    });
    
  })
  .catch(function(err){
    if (err) throw err;
  });
});
    
};