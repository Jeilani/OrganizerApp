const express = require("express"),
      router = express.Router(),
      bcrypt = require("bcryptjs")
const User  = require('../../models/User')
const UserSession = require("../../models/UserSession")

router.get("/", (req, res)=>{
    res.send("signup get route")
})

router.post("/signup", (req, res)=>{
    let {username, email, password } = req.body

    if (!username){
        console.log("happens in userame")
        res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        })
    }

    if (!email){
        console.log("happens in email")
        res.send({
            success: false,
            message: 'Error: email cannot be blank.'
        })
    }

    if (!password){
        console.log("happens in password")
        res.send({
            success: false,
            message: 'Error: password cannot be blank.'
        })
    }

    email = email.toLowerCase()

    //steps:
    //1.verify email doesn't exist
    //2. Save
    User.find({
        email: email
    }, (err, previousUsers)=>{
        if (err) {
            console.log("happens in find")
            return res.send({
                success: false,
                message: 'Error: Server Error'
            })
        } else if (previousUsers.length > 0){
            return res.send({
                success: false,
                message: 'Error: Server Error'
            })
        }

        let newUser = new User({
            username: username,
            email: email,
            password: password
        })

        newUser.password = newUser.generateHash(password);

        newUser.save((err, user)=>{
            if (err){
                console.log(err)
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }

            const userSession = new UserSession()
            userSession.userId = newUser._id
            userSession.save((err, doc)=>{
                if (err){
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Valid sign up and token',
                    token: doc._id,
                    userId: newUser._id
                })
            })
        })


    })

})

router.post("/signin", (req, res)=>{
    let {username, password} = req.body

    if (!username){
        console.log("happens in username")
        res.send({
            success: false,
            message: 'Error: username cannot be blank.'
        })
    }

    if (!password){
        console.log("happens in password")
        res.send({
            success: false,
            message: 'Error: password cannot be blank.'
        })
    }

    User.find({
        username: username
    }, (err, users)=>{
        if (err){
            return res.send({
                success: false,
                message: 'Error: server error'
            })
        }
        if (users.length !=1){
            return res.send({
                success: false,
                message: 'Error invalid'
            })
        }

        const user = users[0]

        if (!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: Invalid password'
            })
        }

        const userSession = new UserSession()

        userSession.userId = user._id
        userSession.save((err, doc)=>{
            if (err){
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                userId: user._id
            })
        })
    })

})

router.get("/verify", (req, res)=>{
    //verify the token is unique and its not deleted
    UserSession.find({
        _id: req.query.query,
        isDeleted: false
    }, (err, sessions)=>{
        if (err){
            return res.send({
                success: false,
                message: 'Error: Internal server error'
            })
        }
        if (sessions.length !=1 ){
            return res.send({
                success: false,
                message: 'Error Invalid'
            })
        } else {
            return res.send({
                success: true,
                message: 'Good',
                userId: sessions[0].userId
            })
        }
    })
})

router.get("/logout", (req, res)=>{
    console.log("reaches here")
    console.log
    //verify the token is unique and its not deleted
    UserSession.findOneAndUpdate ({
        _id: req.query.query,
        isDeleted: false
    }, {
        $set: {isDeleted: true}
    }, null, (err, sessions)=>{
        if (err){
            console.log("error")
            return res.send({
                success: false,
                message: 'Error: Internal server error'
            })
        }
            else {
            return res.send({
                success: true,
                message: 'Good'
            })
        }
    })
})

router.delete("/:id", (req, res)=>{
})



module.exports = router