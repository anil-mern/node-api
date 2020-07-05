let save = async(modal) => {
    try {
        let save = await modal.save();
        return save;
    } catch (err) {
        return err;
    }
}

let findOne = async(modal, query, select) => {
    try {
        let modalData = await modal.findOne(query).select(select).lean().exec();
        return modalData;
    } catch (err) {
        return err;
    }

}

module.exports.save = save;
module.exports.findOne = findOne;