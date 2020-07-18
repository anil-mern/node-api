const mongoose = require("mongoose");
const env = require("dotenv");
const logger = require("../utils/logger");

// accessing .env variables
env.config();

// database connection set connection options
const connectionOptions = {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  // autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 5000, // Give up initial connection after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// Use mongoose to connect & create a default connection
let initConnection = async () => {
  try {
    logger.info("connecting to mongo database...");
    await mongoose.connect(process.env.DB_CONNECT, connectionOptions);
    logger.debug("connect to db");
    return mongoose.connection;
  } catch (err) {
    logger.error("error connect to db, err: " + err);
    throw err;
  }
};

// Get the default connection
module.exports.initConnection = initConnection;
