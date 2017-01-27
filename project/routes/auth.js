module.exports = {
	'facebookAuth': {
		'clientID': '342635926115678',
	    'clientSecret': '6e0018c9f4c86fd7882978f8963ff91e',
	    'profileFields': ['id', 'first_name', 'last_name', 'email', 'photos', 'birthday', 'gender'],
	    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
	},
	'googleAuth': {
		'clientID': '958096732521-9e5mgfg6qc9a36g976bri3jnqi45h3nr.apps.googleusercontent.com',
    	'clientSecret': 'Ydf-MOAZojJQSnHY71z8iGsG',
    	'callbackURL': 'http://localhost:3000/auth/google/callback'
	}
}
