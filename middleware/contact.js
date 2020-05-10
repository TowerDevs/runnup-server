const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { email, subject, text } = req.body;

    body(email, "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();

    body(subject, "Subject received an invalid input")
        .exists().withMessage("Subject is a required field")
        .escape();
    
    body(text, "Message received an invalid input")
        .exists().withMessage("Message is a required field")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    };

    return next();
};