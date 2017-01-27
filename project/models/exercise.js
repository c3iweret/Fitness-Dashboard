var mongoose = require('mongoose');

///////////Exercise
var exerciseSchema = mongoose.Schema({
    name : {type: String, default: 'Unnamed Exercise', unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

exerciseSchema.methods.findSimilarType = function findSimilarType (cb) {
  return this.model('Exercise').find({ type: this.type }, cb);
};


///////////Exercise Entry
var exerciseEntrySchema = mongoose.Schema({
    exercise: {type: String},
  	year : { type: Number},
  	month : { type: Number},
  	day : { type: Number},
  	repetitions: {type: Number},
  	sets: {type: Number},
  	note: {type: String, default: 'No notes'},
	User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports.ExerciseEntry = mongoose.model('ExerciseActivity', exerciseEntrySchema);