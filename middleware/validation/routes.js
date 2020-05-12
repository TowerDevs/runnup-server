const { body, validationResult } = require("express-validator");

exports.create = (req, res, next) => {
    const errors = validationResult(req);

    body("userID", "User ID received an invalid input")
        .exists().withMessage("User ID is a required field")
        .trim()
        .escape();

    body("routeName", "routeName received an invalid input")
        .exists().withMessage("Route Name is a required field")
        .trim()
        .escape();

    body("length", "Length received an invalid input")
        .exists().withMessage("Length is a required field")
        .trim()
        .escape();

    body("duration", "Duration received an invalid input")
        .exists().withMessage("Duration is a required field")
        .trim()
        .escape();

    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};