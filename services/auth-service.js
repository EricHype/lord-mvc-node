
var authConfig = require('../config/auth-config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports.authenticateUser = function(user){

    var token = jwt.sign(user, authConfig.secret, {
      expiresIn: 86400 // expires in 24 hours
    }); 
    
    return token;
};