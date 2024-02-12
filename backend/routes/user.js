const express = require('express');
const router = express.Router();
const {User} = require('../db');
const {signupSchema, signinSchema} = require('./types');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")

router.post("/signup", (req,res) => {
    const {success} = signupSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            msg: "Wrong Inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg: "User already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userID = user._id;

    const token = jwt.sign({
        userID
    }, JWT_SECRET);

    res.status(200).json({
        msg: "User Created Successfully",
        token: token
    })
})

router.post("/signin", (req,res) => {
    const {success} = signinSchema.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            msg: "Incorrect Inputs"
        })
                    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    }) 
    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.status(200).json({
            token: token
        })

        return;
    }
})

module.exports = router;