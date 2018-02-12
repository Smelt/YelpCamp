var mongoose = require('mongoose');

//schema setup 
var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Campground = mongoose.model("Campground", campGroundSchema);

module.exports = Campground;