const express = require('express');
const router = express.Router();

const User = require('../models/User');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res)=>{
    //TODO: validation
    const { email,name,surname,password } = req.body;

    brcypt.hash(password,10).then((hash)=>{
        const user = new User({
            email,name,surname,password:hash
        });

        const promise = user.save();

        promise.then((data)=>{
            res.json({status:true,data:data});
        }).catch((err)=>{
            res.json({status:false,erro:err});
        });
    });
});

router.post('/login',async (req,res) => {
    //TODO: validation

    const {email,password} = req.body;

    const user= await User.findOne({ email });

    if(user && (await brcypt.compare(password,user.password))) {
        // Create a new jwt token
        const token = jwt.sign({user_id: user._id, email}, "testset",{expiresIn: "1h"});

        user.token = token;

        //TODO: reponse builder
        res.json({ email, token });
        return;
    }
    res.status(400).json({
        status: false,
        message: "Invalid credentials"
    })
});

module.exports = router;