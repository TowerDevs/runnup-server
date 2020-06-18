const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    body("date", "Date received an invalid input")
        .exists().withMessage("Date is a required field")
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