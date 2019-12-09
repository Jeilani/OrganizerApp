const mongoose = require("mongoose")

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