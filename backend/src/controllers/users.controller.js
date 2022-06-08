const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const db = require("../models");
const User = db.users;

const isPasswordValid = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password)
    ? ""
    : "Your password must be 8-20 characters long, at least one uppercase letter, one lowercase letter and one number.";
};

exports.create = async (req, res) => {
  const passwordError = isPasswordValid(req.body.password);
  if (passwordError) {
    return res.status(400).json({
      success: false,
      error: passwordError,
    });
  }

  const userInstance = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
  });

  try {
    const encryptedPw = bcrypt.hashSync(userInstance.password, 10);
    userInstance.password = encryptedPw;
    await userInstance.save();

    return res.status(201).json({
      success: true,
      message: `User ${userInstance.username} created!`,
    });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      return res.status(422).json({
        success: false,
        error: `The username ${req.body.username} or email ${req.body.email} are already in use!`,
      });
    } else if (err.name === "ValidationError") {
      let errors = [];
      Object.keys(err.errors).forEach((key) => {
        errors.push(err.errors[key].message);
      });
      return res.status(400).json({ success: false, error: errors });
    }
    return res.status(500).json({
      success: false,
      error: err.message || "Some error occurred while creating account.",
    });
  }
};

exports.login = async (req, res) => {
  if (!(req.body.username && req.body.password)) {
    return res
      .status(400)
      .json({ success: false, error: "Login with username and password!" });
  }

  try {
    const user = await User.findOne({
      username: req.body.username,
    }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials!",
      });
    }

    const token = jwt.sign({ userId: user._id }, config.SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      authKey: token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Some error occurred while logging.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.newPassword) {
    return res.status(400).json({
      success: false,
      error: "Please provide username, email and newPassword",
    });
  }

  const passwordError = isPasswordValid(req.body.newPassword);
  if (passwordError) {
    return res.status(400).json({
      success: false,
      error: passwordError,
    });
  }

  try {
    const userInstance = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (!userInstance) {
      return res.status(404).json({
        success: false,
        error: `User with username ${req.body.username} and email ${req.body.email} not found!`,
      });
    }

    const encryptedPw = bcrypt.hashSync(req.body.newPassword, 10);
    await User.findByIdAndUpdate(
      userInstance._id,
      { password: encryptedPw },
      {
        returnOriginal: false, // to return the updated document
        runValidators: false, // update validators on update command
        useFindAndModify: false, //remove deprecation warning
      }
    ).exec();

    return res
      .status(200)
      .json({ success: true, message: "Password updated!" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Some error occurred while resetting the password.",
    });
  }
};

exports.sample = (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "OK" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Some error occurred while something.",
    });
  }
};
