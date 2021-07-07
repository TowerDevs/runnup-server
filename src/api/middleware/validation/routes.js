const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    body("name", "routeName received an invalid input")
        .exists().withMessage("Route Name is a required field")
        .trim()
        .escape();

    body("distance", "Distance received an invalid input")
        .exists().withMessage("Distance is a required field")
        .trim()
        .escape();

    body("duration", "Duration received an invalid input")
        .optional()
        .trim()
        .escape();

    body("pace", "Pace received an invalid input")
        .optional()
        .trim()
        .escape();

    body("calories", "Calories received an invalid input")
        .optional()
        .trim()
        .escape();

    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};