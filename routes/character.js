var isLoggedIn = require('../middleware/isLoggedIn').isLoggedIn;

module.exports = function(routes){
    
    //head route on login/game start
    routes.get('/character', isLoggedIn, function(req, res){
         
    });
    
};