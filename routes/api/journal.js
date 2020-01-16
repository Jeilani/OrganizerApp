const express = require("express"),
      router = express.Router()

const auth = require("../../middleware/auth")

const Journal = require("../../models/Journal")


router.get("/", (req, res)=>{
    Journal.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.put("/:id", (req, res)=>{
    Journal.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(item =>{
        res.json(item)
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({success: false})
    })
})

router.get("/:id/:idtwo/:idthree/:userId", (req, res)=>{
    const newDate = new Date(req.params.id, req.params.idtwo, req.params.idthree)
    Journal.find({
        date: {
              $gte: new Date(new Date(newDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(newDate).setHours(23, 59, 59))
               },
        userId: req.params.userId
        })
    .then(daily =>{
        if (daily.length === 0){
            res.json({
             name: "nothing"
            })
        } else {
            res.json(...daily)
        }

    })
})



router.post("/", (req, res)=>{
    const newJournal = new Journal({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId
    })

    newJournal.save()
    .then(journal=>{
        res.json(...journal)
    })
    .catch(console.log("error in saving journal"))

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