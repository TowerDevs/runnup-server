const { body, validationResult } = require("express-validator");

exports.create = (req, res, next) => {
    const errors = validationResult(req);

    body("userID", "User ID received an invalid input")
        .exists().withMessage("User ID is a required field")
        .trim()
        .escape();

    body("day", "Day received an invalid input")
        .exists().withMessage("Day is a required field")
        .trim()
        .escape();

    body("routeID", "Route ID received an invalid input")
        .exists().withMessage("Route ID is a required field")
        .trim()
        .escape();

    body("avgPace", "Average Pace received an invalid input")
        .exists().withMessage("Average Pace is a required field")
        .trim()
        .escape();

    body("totalTime", "Total Time received an invalid input")
        .exists().withMessage("Total Time is a required field")
        .trim()
        .escape();

    if(!errors.isEmpty()) return res.status(400).json(errors.msg);

    return next();
};