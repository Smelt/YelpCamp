var express         = require('express'), 
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose');


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



//schema setup 
var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

var Campground = mongoose.model("Campground", campGroundSchema);
/*
Campground.create(
    {
        name: "Granite Hill",
        image: "https://static.pexels.com/photos/14287/pexels-photo-14287.jpeg"
    }, function(err, campGround){
        if(err){
            console.log(err);
        }else{
            console.log("Campground created");
            console.log(campGround);
        }
    }
)
*/

/*
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
*/


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
     if(err){
         console.log(err);
     }
     else{
         res.render('campgrounds', {campgrounds: allCampgrounds});
     }
  });

   // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form add to campgrounds array
    //redirect back to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var campGround = { name: name, image: image};
    Campground.create(campGround, function(err, newlyCreated){
        if(err){
            console.log("Error");
        }
        else{
            res.redirect("/campgrounds");
        }
    } )
   
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Yelp Camp Server has started");
});