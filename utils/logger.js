const { createLogger, format, transports } = require("winston");
const env = require("dotenv");

env.config();
const logger = createLogger({
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL,
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

module.exports = logger;
