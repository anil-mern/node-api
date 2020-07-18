"use strict";
/**
 * @author Anil Bomma
 * Module dependencies.
 */

let userController = require("../controllers/user.server.controller");

module.exports = function (app) {
  app.route("/api/user/register").post(userController.saveUser);
  app.route("/api/user/login").post(userController.login);
};
