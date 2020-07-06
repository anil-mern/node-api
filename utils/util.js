const mongoose = require("mongoose");
const logger = require("./logger");

uuidGenerator = () => {
  return mongoose.Types.ObjectId().toString();
};

/**
 * This fucntion is used to validate the body parameters by sending feilds list
 * @param reqBody      request body.
 * @param feilds      required parametrs.
 * @return A boolean or rejected with an Error
 */
validateReqBody = async (reqBody, feilds) => {
  if (feilds instanceof Array) {
    let error = "";
    feilds.map((feild) => {
      if (!reqBody[feild]) {
        error += `, ${feild}`;
      }
    });

    if (error) {
      error = "missing required feild" + error;
      throw { message: error };
    }

    return true;
  } else {
    logger.error("validateReqBody fucntion, feilds should be array of strings");
    throw `missing required feild ${feild}`;
  }
};

module.exports.uuid = uuidGenerator;
module.exports.validateReqBody = validateReqBody;
