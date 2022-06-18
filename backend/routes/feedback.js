const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const feedbackController = require("../controllers/feedback");

router.get("/:id", feedbackController.findByProduct);

router.post(
  "/:id",
  [
    body("rating").isInt({min: 1, max: 5}),
  ],
  feedbackController.create
);

router.delete("/:id", feedbackController.delete);

router.patch(
  "/:id",
  [
    body("rating").isInt({min: 1, max: 5})
  ],
  feedbackController.update
);

module.exports = router;
