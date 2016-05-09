
module.exports = function(routes, passport) {
  
    routes.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); // load the index.ejs file
    });
    
    routes.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); // load the index.ejs file
    });
    
    routes.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    routes.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    routes.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/game', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    routes.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
};