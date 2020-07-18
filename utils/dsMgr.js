let save = async (modal) => {
  try {
    let save = await modal.save();

    if (save instanceof mongoose.Error) {
      throw save;
    }
    return save;
  } catch (err) {
    throw err;
  }
};

let findOne = async (modal, query, select) => {
  try {
    let modalData = await modal.findOne(query).select(select).lean().exec();
    if (modalData instanceof mongoose.Error) {
      throw modalData;
    }
    return modalData;
  } catch (err) {
    return err;
  }
};

module.exports.save = save;
module.exports.findOne = findOne;
