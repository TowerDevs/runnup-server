const logger = require("../../config/logger");

module.exports = (req, res) => {
    const { error } = req.body; 

    return logger.error(error);
};