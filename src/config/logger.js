const winston = require("winston");
const { LoggingWinston } = require("@google-cloud/logging-winston");

module.exports = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.Console(),
      new LoggingWinston()
    ]
});