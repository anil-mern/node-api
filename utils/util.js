const mongoose = require('mongoose');

uuidGenerator = () => {
    return mongoose.Types.ObjectId().toString();
}

module.exports.uuid = uuidGenerator;