var LocalStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');
var configAuth = require('../routes/auth');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email', 
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		// asynchronous
		process.nextTick(function() {
			User.findOne({'local.username': email}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					// return false to passport since its invalid
					return done(null, false, req.flash('signupMessage', 'That email already taken!'));
				} else {
					if (password == req.body.confirmedPassword) {
						var newUser = new User();
						newUser.local.username = email;
						newUser.local.password = newUser.generateHash(password);
						newUser.stats.height = req.body.height;
						newUser.stats.weight = req.body.weight;
						newUser.stats.birthday = req.body.birthday;
						newUser.stats.gender = req.body.gender;
						newUser.name = req.body.firstName + " " + req.body.lastName;
						newUser.bookmarks = [];

						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					} else {
						return done(null, false, req.flash('signupMessage', 'Passwords do not match!'))
					}
				}
			});

		});
	}

	));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.username': email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'No User Found'));
				}
				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Invalid Password'));
				}
				return done(null, user);
			})
		})
	}
	));

	// Login session (Facebook Login)
	passport.use(new facebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		profileFields: configAuth.facebookAuth.profileFields,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous
		process.nextTick(function() {
			User.findOne({ 'local.username': profile.photos[0].value }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (user) {
					console.log('Birthday: ' + profile.birthday);
					User.findByIdAndUpdate(user.id, { 'facebook.id': profile.id,
					 	'facebook.token': accessToken,
					 	'facebook.profilePic': profile.photos[0].value,
					 	'stats.gender': profile.gender,
					 	'stats.birthday': profile.birthday },
					 	{ new: true }, function(err, updatedUser) {
					 		if (err) {
					 			return done(err);
					 		}
					 		console.log('The raw response: ' + updatedUser);
					 		if (updatedUser) {
					 			return done(null, updatedUser);
					 		}
					 	});
				} else {
					var newUser = new User();
					newUser.local.username = profile.emails[0].value;
					newUser.local.password = newUser.generateHash('default');

      				newUser.facebook.id = profile.id;
      				newUser.facebook.token = accessToken;
      				newUser.facebook.profilePic = profile.photos[0].value;

        			newUser.stats.birthday = profile.birthday;
        			newUser.stats.gender = profile.gender;
        			newUser.stats.height = 180;  // default: 180
        			newUser.stats.weight = 60;  // default: 60
        			newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
        			newUser.bookmarks = [];

        			newUser.save(function(err) {
        				if (err) {
        					throw err;
        				}
        				return done(null, newUser);
        			});
				}
			}
		)});
	}));

	// Login session (Google+ Login)
	passport.use(new googleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous
		process.nextTick(function() {
			User.findOne({ 'local.username': profile.emails[0].value }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (user) {
					User.findByIdAndUpdate(user.id, { 'google.id': profile.id,
					 	'google.token': accessToken,
					 	'google.profilePic': profile.photos[0].value },
					 	{ new: true }, function(err, updatedUser) {
					 		if (err) {
					 			return done(err);
					 		}
					 		// console.log('The raw response: ' + updatedUser);
					 		if (updatedUser) {
					 			return done(null, updatedUser);
					 		}
					 	});
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.local.username = profile.emails[0].value;
					newUser.local.password = newUser.generateHash('default');

      				newUser.google.id = profile.id;
      				newUser.google.token = accessToken;
					newUser.google.profilePic = profile.photos[0].value;
      				
      				newUser.stats.birthday = '1999/01/01';  // default: 1999/01/01
        			newUser.stats.gender = 'male';  // default: male
        			newUser.stats.height = 180;  // default: 180
        			newUser.stats.weight = 60;  // default: 60
        			newUser.name = profile.displayName;
        			newUser.bookmarks = [];
        			

        			newUser.save(function(err) {
        				if (err) {
        					throw err;
        				}
        				return done(null, newUser);
        			})
				}
			}
		)});
	}));

}