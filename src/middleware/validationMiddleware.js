module.exports = (schema) => {
    return (req, res, next) => {

        const options = {
            abortEarly: false,
            allowUnknown: true,
            striptUnknown: true,
            convert: true
        };

        const {
            error, value
        } = schema.validate(req, options);

        if (error) {

            const errorMessage = error.details.map(e => e.message).join(', ');
            //TODO: throw
            res.status(422)
            .json({
                status: false,
                message: errorMessage
            })

        } else {
            next();
        }
    }
}
