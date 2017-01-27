var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
  name: { type: String },
  email : { type: String },
  comment: { type: String }
});

module.exports = mongoose.model('Feedback', feedbackSchema);