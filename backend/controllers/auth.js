const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json( {error: errors.errors[0].msg} );
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashPassword = await bcrypt.hash(password, 2);

    const userData = {
      username,
      email,
      password: hashPassword,
    };

    await User.create(userData);

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};