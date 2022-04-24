module.exports = (schema) => {
    return (req, res, next) => {
        const {
            error
        } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            res.status(422)
                .json({
                    status: false,
                    message: error.details
                })
        }
    }
}
