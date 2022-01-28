const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true 
    },
    name: {
        type: String,
        default: null
    },
    surname: {
        type: String,
        default: null
    },
    password: String,
    token: String,
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('video', UserSchema);