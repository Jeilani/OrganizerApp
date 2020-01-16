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
      port			       = process.env.PORT || 3001,
      config               = require('config'),
      path                 =require('path')

const dailyRoute = require("./routes/api/daily"),
      eventRoute = require("./routes/api/event"),
      generalTodoRoute = require("./routes/api/general"),
      journalRoute = require("./routes/api/journal"),
      miscTodoRoute = require("./routes/api/misc"),
      signinRoute = require("./routes/api/signin")


const db = config.get('mongoURI')

mongoose.connect(db, {
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
app.use("/api/account", signinRoute)

mongoose.connect("mongodb://localhost/OrganizerApi", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
console.log("Connected to DB!");
}).catch(err => {
console.log("ERROR:", err.message);
});



//passport configuration

app.set("view engine", "ejs");

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port , function (req, res) {
console.log("Organizer App Server has started");

});