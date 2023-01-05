const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const cartController = require("../controllers/cart");

const auth = require("../middleware/auth");

router.get("/", auth, cartController.findByUser);

router.patch("/", auth, cartController.update);

router.patch("/increase", auth, cartController.increaseQuantity);

router.patch("/decrease", auth, cartController.decreaseQuantity);

router.patch("/remove", auth, cartController.removeItem);


module.exports = router;
