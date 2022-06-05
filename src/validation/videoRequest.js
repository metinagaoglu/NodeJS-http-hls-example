const Joi = require('joi');

exports.videoListSchema = Joi.object({
    body: Joi.object({
        videobucket: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    })
})

exports.getVideoByIdSchema = Joi.object({
    params: Joi.object({
        id: Joi.string()
            .alphanum()
            .min(10)
            .max(30)
            .required(),
    })
})