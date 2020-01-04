const express    		   = require("express"),
      app        		   = express(),
      bodyParser 		   = require("body-parser"),
      mongoose   		   = require("mongoose"),
      DailyTodo            = require("./models/DailyTodo.js"),
      Event                = require("./models/Event.js"),
      GeneralTodo          = require("./models/GeneralTodo.js"),
      Journal              = require("./models/Journal.js"),
      MiscTodo             = require("./models/MiscTodo.js"),
      User                 = require("./models/User.js"),
      port			       = process.env.PORT || 3001

const dailyRoute = require("./routes/api/daily"),
      eventRoute = require("./routes/api/event"),
      generalTodoRoute = require("./routes/api/general"),
      journalRoute = require("./routes/api/journal"),
      miscTodoRoute = require("./routes/api/misc"),
      userRoute = require("./routes/api/user")

mongoose.connect("mongodb://localhost/OrganizerApi", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(()=>{
   console.log("connected to database")
}).catch(err=>{
    console.log("There is an error with connecting to the database")
    console.log(err)
})



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/daily", dailyRoute)
app.use("/api/events", eventRoute)
app.use("/api/general", generalTodoRoute)
app.use("/api/journal", journalRoute)
app.use("/api/misc", miscTodoRoute)
app.use("/api/user", userRoute)

mongoose.connect("mongodb://localhost/OrganizerApi", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
console.log("Connected to DB!");
}).catch(err => {
console.log("ERROR:", err.message);
});



//passport configuration

app.set("view engine", "ejs");


app.listen(port , function (req, res) {
console.log("YelpCamp server has started!");

});