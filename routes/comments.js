var express = require('express');

var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments new
router.get("/new", isLoggedIn,  function(req, res){
    console.log("At 1");
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Failing 2");
            console.log(err);
        }else{
            console.log("blah blah");
            res.render("comments/new.ejs", { campground: campground });
        }
    });

});

//comments create
router.post("/", isLoggedIn, function(req, res){
    console.log("posting man");
    //lookup campground using ID    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } 
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment._id);
                    campground.save();
                    let url = "/campgrounds/" + req.params.id;
                    //console.log("Adde Comment "   Comment);
                    res.redirect(url);
                }
            })
        }
    })
});

//middle ware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;