const express = require("express"),
      router = express.Router()

const auth = require("../../middleware/auth")

const MiscTodo = require("../../models/MiscTodo")

router.get("/", (req, res)=>{
    MiscTodo.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.get("/:id/:blah/:blah/:userId", (req, res)=>{
    MiscTodo.find({userId: req.params.userId})
    .then(todo =>{
        res.json(todo)
    })
})


router.post("/", (req, res)=>{
    const newMiscTodo = new MiscTodo({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId
    })

    newMiscTodo.save().then(todo=>{
        res.json(todo)
    })

})

router.put("/:id", (req, res)=>{
    MiscTodo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(item =>{
        res.json(item)
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })
})

router.delete("/:id", (req, res)=>{
    const objectId = req.params.id
    MiscTodo.findByIdAndDelete(req.params.id)
    .then(item =>{
        res.send( objectId + "is now deleted")
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })

})



module.exports = router