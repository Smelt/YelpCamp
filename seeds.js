var mongoose = require('mongoose');
var Campground = require('./models/campground');
var campGroundData = require('./static/campgroundData.json');
var Comment = require('./models/comment');



function seedDB(){
    Comment.remove({}, function(err){
        console.log("Removed comments");
    })
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed Campgrounds.");
        addCampGrounds();
    });
}

function addComments(campground){
    Comment.create({
        text: "This place is great but, I wish there was Wifi.",
        author: "Homer Simpson"
    }, function(err, comment){
        if(err){
            console.log(err);
        }
        else{
            campground.comments.push(comment);
            campground.save();
        }
    });
}

function addCampGrounds(){
    campGroundData.forEach(function(seed){
        Campground.create(seed, function(err,campground){
            if(err){
                console.log(err);
            }
            else{
                addComments(campground);
            }
            
        });
        console.log('Added Campgrounds');
    })
}

module.exports = seedDB;
