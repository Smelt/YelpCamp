var express         = require('express'), 
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    Campground      = require('./models/campground'),
    seedDB          = require('./seeds');


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


seedDB();


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
     if(err){
         console.log(err);
     }
     else{
         res.render('index', {campgrounds: allCampgrounds});
     }
  });

   // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form add to campgrounds array
    //redirect back to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var campGround = { name: name, image: image, description: description};
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

app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(3000, function(){
    console.log("Yelp Camp Server has started");
});

