const express = require("express"),
      bodyParser = require("body-parser"),
      router = express.Router({mergeParams: true});

const auth = require("../../middleware/auth")
const DailyTodo = require("../../models/DailyTodo")

//GET api/daily
//GET all daily todos

router.get("/", (req, res)=>{
    DailyTodo.find({})
    .then(daily=>{
        res.json(daily)
    })
})

router.get("/:id/:idtwo/:idthree/:userId", (req, res)=>{
    const newDate = new Date(req.params.id, req.params.idtwo, req.params.idthree)
    DailyTodo.find({
        date: {
              $gte: new Date(new Date(newDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(newDate).setHours(23, 59, 59))
               },
        userId: req.params.userId

        }).sort({date: 1})
    .then(daily =>{
        res.json(daily)
    })
})

router.post("/", (req, res)=>{
    const newDaily = new DailyTodo({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId
    })

    newDaily.save().then(item=>{
        res.json(item)
    })
})

router.put("/:id", (req, res)=>{
    DailyTodo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(item =>{
        res.json(item)
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })
})


router.delete("/:id", (req, res)=>{
    const objectId = req.params.id
    DailyTodo.findByIdAndDelete(req.params.id)
    .then(item =>{
        res.send( objectId + "is now deleted")
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })


})



module.exports = router