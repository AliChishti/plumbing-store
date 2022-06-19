const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Product = require("../models/product");

const productController = require("../controllers/product");

const auth = require("../middleware/auth");

router.get("/", auth, productController.get);

router.post(
  "/",
  [
    auth,
    body("name")
      .trim()
      .custom(async (name) => {
        const product = await Product.findByName(name);
        if (product[0].length > 0) {
          return Promise.reject("Product already exists!");
        }
      }),
  ],
  productController.create
);

router.delete("/:id", auth, productController.delete);

router.patch(
  "/:id",
  [
    auth,
    body("name")
      .trim()
      .custom(async (name) => {
        const product = await Product.findByName(name);
        if (product[0].length > 0) {
          return Promise.reject("Product already exists!");
        }
      }),
  ],
  productController.update
);

module.exports = router;
