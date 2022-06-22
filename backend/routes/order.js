const express = require("express");

const router = express.Router();


const orderController = require("../controllers/order");

const auth = require("../middleware/auth");

router.get("/:id", auth, orderController.find);

router.get("/", auth, orderController.findByUser);

router.post("/", auth, orderController.create);

router.patch("/:id", auth, orderController.update);

module.exports = router;
