const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: String,
    size: Number,
    date: {
        type: Date,
        default: Date.now
    },
    partitions:[
        {
            name: String,
            path: String,
            size: Number
        }
    ],
    extension: String,
    available: Boolean
});

module.exports = mongoose.model('video', VideoSchema);