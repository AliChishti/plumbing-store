const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const cardController = require("../controllers/card");

const auth = require("../middleware/auth");

router.get("/", auth, cardController.findByUser);

router.post(
  "/",
  [
    auth, 
    body("validity").custom(async (date) => {
      const enteredDate = new Date(date);
      const now = new Date();

      if (now > enteredDate) {
        return Promise.reject("card is invalid!");
      }
    }),
  ],
  cardController.create
);

router.patch(
  "/",
  [
    auth, 
    body("validity").custom(async (date) => {
      const enteredDate = new Date(date);
      const now = new Date();

      if (now > enteredDate) {
        return Promise.reject("card is invalid!");
      }
    }),
  ],
  cardController.update
);

module.exports = router;
