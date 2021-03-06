var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var Comment =  require("../models/comment");


router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });

    // res.render("campgrounds", {campgrounds: campgrounds});
});

router.post("/", isLoggedIn, function (req, res) {
    //get data from form add to campgrounds array
    //redirect back to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var campGround = { name: name, image: image, description: description, author: author };
    Campground.create(campGround, function (err, newlyCreated) {
        if (err) {
            console.log("Error");
        }
        else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })

});

router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    console.log("getting by ID");
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;