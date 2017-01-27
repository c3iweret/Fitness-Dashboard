module.exports = function(app, passport) {
	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/index',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/logout', (req, res) => {
    	req.logout();
    	req.session.destroy();
    	res.redirect("/");
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
		res.redirect('/index');
	});

	app.get('/auth/google', passport.authenticate('google', {
    	scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
	}));

	app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), function(req, res) {
    	res.redirect('/index');
	});
};
