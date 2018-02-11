var mongoose = require('mongoose');

//schema setup 
var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campGroundSchema);

module.exports = Campground;