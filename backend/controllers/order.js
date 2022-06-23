const { validationResult } = require("express-validator");

const Order = require("../models/order");

exports.findByUser = async (req, res, next) => {
  try {
    if (req.username === "admin") {
      const orders = await Order.fetchAll();
      res.json(orders[0]);
    }

    const orders = await Order.findByUser(req.userId);
    res.json(orders[0]);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const orders = await Order.find(req.params.id);
    if(orders[0][0]){
      orders[0][0].detail = JSON.parse(orders[0][0].detail)
    }
    res.json(orders[0][0]);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ error: errors.errors[0].msg });
  }

  const user = req.userId;
  const detail = req.body.detail;
  const price = req.body.price;
  const status = "CONFIRMED";

  try {
    await Order.create({ user, detail, status, price });
    res.status(201).json({ message: "Order created successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ error: errors.errors[0].msg });
  }

  const id = req.params.id;
  const status = req.body.status;

  try {
    await Order.update(id, { status });

    res.status(200).json({ message: "Order updated successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
