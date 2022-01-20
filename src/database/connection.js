const mongoose = require('mongoose');


module.exports =() => {
    mongoose.connect('mongodb://'+process.env.MONGO_HOST+'/videohlsexample');
}