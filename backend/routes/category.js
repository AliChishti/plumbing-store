const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Category = require("../models/category");

const categoryController = require("../controllers/category");

const auth = require("../middleware/auth");

router.post(
  "/",
  [
    auth,
    body("name")
      .trim()
      .custom(async (name) => {
        const category = await Category.findByName(name);
        if (category[0].length > 0) {
          return Promise.reject("Category already exists!");
        }
      }),
  ],
  categoryController.create
);

router.delete("/:id", auth, categoryController.delete);

router.patch("/:id", auth, categoryController.update);

module.exports = router;
