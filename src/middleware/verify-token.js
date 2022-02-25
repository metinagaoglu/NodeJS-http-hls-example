const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token) {
        jwt.verify(token,'testset',(err,decoded) => {
            if(err) {
                res.json({
                    status:false,
                    message: err
                });
            } else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.status(401);
        res.json({
            status:false,
            message: 'No token provided.'
        });
    }
};