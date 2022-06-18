const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const User = require("../models/user");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom(async (username) => {
        const user = await User.find("", username);
        if (user[0].length > 0) {
          return Promise.reject("Username already exists!");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (email) => {
        const user = await User.find(email, "");
        if (user[0].length > 0) {
          return Promise.reject("Email already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  authController.signup
);

module.exports = router;
