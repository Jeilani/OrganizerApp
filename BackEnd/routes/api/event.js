const express = require("express"),
      router = express.Router()

const Event = require("../../models/Event")
const todaysDate = new Date()

router.get("/", (req, res)=>{
    Event.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.get("/:id/:idtwo/:idthree", (req, res)=>{
    const newDate = new Date(req.params.id, req.params.idtwo, req.params.idthree)
    Event.find({
        date: {
              $gte: new Date(new Date(newDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(newDate).setHours(23, 59, 59))
               }
        })
    .then(daily =>{
        res.json(daily)
    })
})

router.post("/", (req, res)=>{
    const newEvent = new Event({
        name: req.body.name,
        date: req.body.date
    })

    newEvent.save().then(todo=>{
        res.json(todo)
    })

})

router.delete("/:id", (req, res)=>{
    const objectId = req.params.id
    Event.findByIdAndDelete(req.params.id)
    .then(item =>{
        res.send( objectId + "is now deleted")
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })

})



module.exports = router