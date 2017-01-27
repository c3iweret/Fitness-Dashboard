var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({

	local: {
		username: String,
		password: String
	},

	facebook: {
		id: String,
		token: String,
    	profilePic: String
	},

	google: {
		id: String,
		token: String,
    	profilePic: String
    },

    stats: {
    	height: Number,
    	weight: Number,
    	birthday: String,
    	gender: String
    },

    name: String,
    bookmarks: [ String ],
    registeredOn: { type: Date, default: Date.now },

	todoList: mongoose.Schema.Types.Mixed
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
