const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Cart = require("../models/cart");

const config = require("../config/config.json");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ error: errors.errors[0].msg });
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

    const user = await User.create(userData);
    await Cart.create({user: user[0].insertId, items: null});
  
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;

  try {
    const user = await User.find(usernameOrEmail, usernameOrEmail);

    if (user[0].length !== 1) {
      const error = new Error(
        "A user with this username or email could not be found"
      );
      error.statusCode = 401;
      throw error;
    }

    const loggedUser = user[0][0];
    const comparePass = await bcrypt.compare(password, loggedUser.password);

    if (!comparePass) {
      const error = new Error("Username or Email or Password is invalid");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        username: loggedUser.username,
        email: loggedUser.email,
        userId: loggedUser.id,
      },
      config.secret,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token: token, username: loggedUser.username });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
