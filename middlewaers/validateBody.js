const {HttpError} = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        if (JSON.stringify(req.body) === '{}' && req.method === 'PATCH') {
            console.log((JSON.stringify(req.body)));
            throw HttpError(400, "Missing field favorite");
        } else if (JSON.stringify(req.body) === '{}') {
            throw HttpError(400, "Missing fields");
        };
        
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.details[0].message));
        };
        next();
    };

    return func;
};

module.exports = validateBody;