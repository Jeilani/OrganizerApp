const express = require("express"),
      router = express.Router()

const Journal = require("../../models/Journal")


router.get("/", (req, res)=>{
    Journal.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.get("/:id/:idtwo/:idthree", (req, res)=>{
    const newDate = new Date(req.params.id, req.params.idtwo, req.params.idthree)
    Journal.find({
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
    const newJournal = new Journal({
        name: req.body.name,
        date: req.body.date
    })

    newJournal.save().then(journal=>{
        res.json(journal)
    })

})

router.delete("/:id", (req, res)=>{
    const objectId = req.params.id
    Journal.findByIdAndDelete(req.params.id)
    .then(item =>{
        res.send( objectId + "is now deleted")
    })
    .catch(err=>{
        res.status(404).json({succes: false})
    })

})



module.exports = router