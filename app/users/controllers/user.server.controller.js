"use strict";
/**
 * @author Anil Bomma
 * Module dependencies.
 */

const logger = require("../../../utils/logger");
const userService = require("../services/user.server.services");

let saveUser = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        status: 400,
        message: "bad request user details required to save user",
      });
    }
    let serviceResponse = await userService.saveUser(req.body);
    logger.info("saveUser function has executed successfully");
    res.send({ status: 200, response: serviceResponse });
  } catch (err) {
    logger.error("saveUser function has error", err ? err.message : err);
    let status = err.status || err.statusCode || err.code || 500;
    res.status(status).send({ status, error: err });
  }
};

module.exports.saveUser = saveUser;
