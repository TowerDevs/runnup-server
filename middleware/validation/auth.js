const { body, validationResult } = require("express-validator");

exports.create = (req, res, next) => {
    const errors = validationResult(req);

    body("email", "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .trim()
        .escape()
        .normalizeEmail();

    body("password", "Password received an invalid input")
        .exists().withMessage("Subject is a required field")
        .trim()
        .escape();

    body("name", "Name received an invalid input")
        .exists().withMessage("Name is a required field")
        .trim()
        .escape();

    body("region", "Region received an invalid input")
        .exists().withMessage("Region is a required field")
        .trim()
        .escape();

    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);

    body("email", "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();

    body("password", "Password received an invalid input")
        .exists().withMessage("Subject is a required field")
        .escape();

    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};