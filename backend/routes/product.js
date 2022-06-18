const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Product = require("../models/product");

const productController = require("../controllers/product");

router.get("/", productController.get);

router.post(
  "/",
  [
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

router.delete("/:id", productController.delete);

router.patch(
  "/:id",
  [
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
