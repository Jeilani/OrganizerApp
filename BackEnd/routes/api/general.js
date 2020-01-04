const express = require("express"),
      router = express.Router()

const GeneralTodo = require("../../models/GeneralTodo")

router.get("/", (req, res)=>{
    GeneralTodo.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.get("/:id/:idtwo/:idthree", (req, res)=>{
    GeneralTodo.find()
    .then(todo =>{
        res.json(todo)
    })
})

router.post("/", (req, res)=>{
    const newGeneralTodo = new GeneralTodo({
        name: req.body.name,
        date: req.body.date
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