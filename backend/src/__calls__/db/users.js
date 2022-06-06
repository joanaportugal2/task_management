const db = require("../../modelsels");
const User = db.users;

// CRUD operations
// CREATE
exports.createOne = async function (item) {
  try {
    const user = new User(item);
    const response = await user.save();
    return response;
  } catch (error) {
    return error;
  }
};

// READ
exports.readAll = async function () {
  try {
    const response = await User.find().exec();
    return response;
  } catch (error) {
    throw Error("error");
  }
};

exports.readOne = async function (value) {
  try {
    const response = await User.findOne({ username: value }).exec();
    return response;
  } catch (error) {
    return error;
  }
};

// UPDATE
exports.updateOne = async function (value, updateObject) {
  try {
    const response = await User.findOneAndUpdate(
      { username: value },
      updateObject,
      {
        returnOriginal: false, // to return the updated document
        runValidators: true, // update validators on update command
        useFindAndModify: false, //remove deprecation warning
      }
    ).exec();
    return response;
  } catch (error) {
    throw Error("error");
  }
};

// DELETE
exports.deleteOne = async function (value) {
  try {
    const response = await User.findOneAndRemove({ username: value }).exec();
    return response;
  } catch (error) {
    throw Error("error");
  }
};
