const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { title, category } = req.body;

    body(title, "Title received an invalid input")
        .exists().withMessage("Title is a required field")
        .escape();

    body(category, "Category received an invalid input")
        .exists().withMessage("Category is a required field")
        .escape();
    
    body(req.body.body, "Body received an invalid input")
        .exists().withMessage("Body is a required field")
        .escape();

    if(password !== "123abc") {
        return res.status(401).json({ message: "Invalid password" });
    };

    if(errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    };

    return next();
};