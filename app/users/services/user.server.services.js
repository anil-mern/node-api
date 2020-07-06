"use strict";
/**
 * @author Anil Bomma
 * Module dependencies.
 */

const async = require("async");
const bcrypt = require("bcrypt");

const logger = require("../../../utils/logger");
const util = require("../../../utils/util");
const dsMgr = require("../../../utils/dsMgr");

const User = require("../modals/user.server.modal");

module.exports.saveUser = async (userData) => {
  try {
    await util.validateReqBody(userData, [
      "email",
      "password",
      "firstName",
      "lastName",
    ]);

    // Encrypt password and store hash in database
    userData.password = await bcrypt.hash(userData.password, 5);

    // save user object in the database
    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: userData.firstName + " " + userData.lastName,
      email: userData.email,
      password: userData.password,
      createdBy: "admin",
    });
    user.userId = user._id;

    return await dsMgr.save(user);
  } catch (ex) {
    logger.error("saveUser function has exception occured" + ex);
    ex.status = 400;
    throw ex;
  }
};
