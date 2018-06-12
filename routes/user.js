
var User = require()

module.exports = function(routes){
    
    //head route on login/game start
    routes.post('/user', function(req, res){
         if (!req.body.name || !req.body.password) {
            return res.json({success: false, msg: 'Registration requires email and password.'});
        }
         
    });
    
};