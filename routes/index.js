var express = require('express');
var router = express.Router();
var User = require('../models/user'),
    passport = require('passport');

//auth routes
router.get("/register", function (req, res) {
    res.render("register")
})

router.post("/register", function (req, res) {
    let newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds")
        });
    });
});

//show login form
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
        res.send("Logged in");
    });

//log out rout
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

router.get("/", function (req, res) {
    res.render("landing");
});

module.exports = router;