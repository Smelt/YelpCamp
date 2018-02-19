var express         = require('express'), 
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    Campground      = require('./models/campground'),
    Comment    = require('./models/comment'),
    seedDB          = require('./seeds');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//seedDB();



app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
     if(err){
         console.log(err);
     }
     else{
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
     }
  });

    res.render("campgrounds", {campgrounds: campgrounds});
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
    res.render("campgrounds/new");
});

 app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
}) 

/*
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})
*/
app.get("/campgrounds/:id/comments/new", function (req, res) {
   Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
   
});

app.post("/campgrounds/:id/comments", function(req,res){
    
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
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
    //create ne Comment
    //connect ne    Comment to campground
    //redirect to campground show page

});

app.listen(3000, function(){
    console.log("Yelp Camp Server has started");
});

