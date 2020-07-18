"use strict";
/**
 * @author Anil Bomma
 * Module dependencies.
 */

const bcrypt = require("bcrypt");

const logger = require("../../../utils/logger");
const util = require("../../../utils/util");
const dsMgr = require("../../../utils/dsMgr");

const User = require("../modals/user.server.modal");
const { login } = require("../controllers/user.server.controller");

let saveUser = async (userData) => {
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

    let res = await dsMgr.save(user);
    console.log("----res ", res);
    return res;
  } catch (ex) {
    logger.error("saveUser function has exception occured " + ex);
    console.log("---", ex.toString());
    ex.status = 401;
    ex.message = "==" + ex.toString();
    throw ex;
  }
};

let loginUser = async (userData) => {
  try {
    await util.validateReqBody(userData, ["email", "password"]);

    let query = {
      email: userData.email,
    };

    let user = await dsMgr.findOne(User, query, "password");

    // Load hash from your password DB.
    const validatePassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    return validatePassword + "";
  } catch (ex) {
    logger.error("saveUser function has exception occured" + ex);
    ex.status = 400;
    throw ex;
  }
};

module.exports.saveUser = saveUser;
module.exports.loginUser = loginUser;
