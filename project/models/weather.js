var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weatherSchema = new Schema({
    _id: String,
    data: Schema.Types.Mixed,
    cacheTime: Date,
});

module.exports = mongoose.model('Weather', weatherSchema);
