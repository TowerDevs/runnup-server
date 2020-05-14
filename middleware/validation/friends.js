const { body, validationResult } = require("express-validator");

exports.friend_add = (req, res, next) => {
    const errors = validationResult(req);

    body("email", "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .trim()
        .escape();
        
    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};