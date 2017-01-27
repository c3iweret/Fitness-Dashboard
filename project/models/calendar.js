var mongoose = require('mongoose');

//create Event model (need to add a place attribute and link it to google maps)
var Event = mongoose.Schema({
  User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  year : { type: Number},
  month : { type: Number},
  day : { type: Number},
  from_time: {
    type: String,
  },
  to_time: {
    type: String,
  },
    
});

module.exports = mongoose.model('Event', Event);