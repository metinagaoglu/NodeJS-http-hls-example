const Joi = require('joi');

exports.videoListSchema = Joi.object({
    videobucket: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})