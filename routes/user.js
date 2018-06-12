
module.exports = function(routes, passport){

    routes.get('/user', passport.authenticate('jwt', {session: false}), function(req, res){
         res.send(req.user);
    });
    
};