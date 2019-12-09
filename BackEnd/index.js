const express    		   = require("express"),
app        		   = express(),
request    		   = require("request"),
bodyParser 		   = require("body-parser"),
mongoose   		   = require("mongoose"),
LocalStrategy 		   = require("passport-local"),
passport 			   = require("passport"),
passportLocalMongoose = require("passport-local-mongoose"),
Campground 		   = require("./models/campground"),
seedDB     		   = require("./seeds"),
Comment    		   = require ("./models/comment"),
User 				   = require("./models/user"),
methodOverride 	   = require("method-override"),
flash 		 		   = require("connect-flash"),
port				   = process.env.PORT || 3000;


//Requiring routes
const DateRoutes = require("./routes/comments"),
campgroundRoutes = require("./routes/campgrounds"),
indexRoutes = require("./routes/index");


//seedDB();

mongoose.connect("mongodb://localhost/OrganizerApi", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
console.log("Connected to DB!");
}).catch(err => {
console.log("ERROR:", err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
secret: "Once again Rusty wins cutest dog!",
resave: false,
saveUninitialiized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));




//passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.set("view engine", "ejs");





app.listen(port , function (req, res) {
console.log("YelpCamp server has started!");

});