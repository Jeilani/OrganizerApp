const express = require("express"),
      router = express.Router()

const Event = require("../../models/Event")
const todaysDate = new Date()

router.get("/:userId", (req, res)=>{
    const todaysDate = new Date()
    const year = todaysDate.getFullYear()
    const month = todaysDate.getMonth() + 2
    const laterDate = new Date(year, month, 27)
    Event.find({
        date: {
              $gte: new Date(new Date(todaysDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(laterDate).setHours(23, 59, 59))
               },
        userId:req.params.userId
        })
    .then(todos =>{
        console.log(todos)
        res.json(todos)
    })
})

router.get("/:id/:idtwo/:idthree/:userId", (req, res)=>{
    const newDate = new Date(req.params.id, req.params.idtwo, req.params.idthree)
    Event.find({
        date: {
              $gte: new Date(new Date(newDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(newDate).setHours(23, 59, 59))
               },
        userId: req.params.userId
        })
    .then(daily =>{
        res.json(daily)
    })
})


router.post("/", (req, res)=>{
    const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId
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