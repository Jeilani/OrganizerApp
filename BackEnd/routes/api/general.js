const express = require("express"),
      router = express.Router()

const auth = require("../../middleware/auth")

const GeneralTodo = require("../../models/GeneralTodo")

router.get("/", (req, res)=>{
    GeneralTodo.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.get("/:id/:idtwo/:idthree/:userId", (req, res)=>{
    GeneralTodo.find({
        userId: req.params.userId
    })
    .then(todo =>{
        res.json(todo)
    })
})

router.post("/", (req, res)=>{
    console.log("happening")
    const newGeneralTodo = new GeneralTodo({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId
    })

    newGeneralTodo.save().then(todo=>{
        res.json(todo)
    })

})

router.put("/:id", (req, res)=>{
    GeneralTodo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(item =>{
        res.json(item)
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })
})

router.delete("/:id", (req, res)=>{
    const objectId = req.params.id
    GeneralTodo.findByIdAndDelete(req.params.id)
    .then(item =>{
        res.send( objectId + "is now deleted")
    })
    .catch(err=>{
        res.status(404).json({success: false})
    })

})



module.exports = router