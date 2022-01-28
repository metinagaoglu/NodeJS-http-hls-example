const express = require('express');
const router = express.Router();

const User = require('../models/User');
const brcypt = require('bcrypt');

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

router.post('/login',(req,res)=>{
    // ..code
});

module.exports = router;