var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Salmon Creek", image: "https://static.pexels.com/photos/6714/light-forest-trees-morning.jpg" },
    { name: "Granite Hill", image: "https://static.pexels.com/photos/14287/pexels-photo-14287.jpeg" },
    { name: "Mountain Goat", image: "https://static.pexels.com/photos/112378/pexels-photo-112378.jpeg" },
    { name: "Grand canyon", image: "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg" },
    { name: "Salmon Creek", image: "https://static.pexels.com/photos/6714/light-forest-trees-morning.jpg" },
    { name: "Granite Hill", image: "https://static.pexels.com/photos/14287/pexels-photo-14287.jpeg" },
    { name: "Mountain Goat", image: "https://static.pexels.com/photos/112378/pexels-photo-112378.jpeg" },
    { name: "Grand canyon", image: "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg" }
];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form add to campgrounds array
    //redirect back to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var campGround = { name: name, image: image};
    campgrounds.push(campGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Yelp Camp Server has started");
});