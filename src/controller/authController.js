const User = require('../models/User');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    const {
        email,
        name,
        surname,
        password
    } = req.body;

    const hash = await brcypt.hash(password, 10);

    const user = new User({
        email,
        name,
        surname,
        password: hash
    });

    try {
        const data = await user.save();
        res.status(201);
        res.json({
            status: true,
            data: data
        });
    } catch (err) {
        res.status(422);
        res.json({
            status: false,
            erro: err
        });
    }
}

exports.login = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    });

    if (user && (await brcypt.compare(password, user.password))) {
        // Create a new jwt token
        const token = jwt.sign({
            user_id: user._id,
            email
        }, "testset", {
            expiresIn: "1h"
        });

        user.token = token;

        //TODO: reponse builder
        res.json({
            email,
            token
        });
        return;
    }
    res.status(400).json({
        status: false,
        message: "Invalid credentials"
    })
}