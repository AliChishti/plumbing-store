const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const feedbackController = require("../controllers/feedback");

const auth = require("../middleware/auth");

router.get("/:id", auth, feedbackController.findByProduct);

router.post(
  "/:id",
  [
    auth,
    body("rating").isInt({min: 1, max: 5}),
  ],
  feedbackController.create
);

router.delete("/:id", auth, feedbackController.delete);

router.patch(
  "/:id",
  [
    auth,
    body("rating").isInt({min: 1, max: 5})
  ],
  feedbackController.update
);

module.exports = router;
