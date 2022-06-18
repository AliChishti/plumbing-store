const { validationResult } = require("express-validator");

const Feedback = require("../models/feedback");

exports.findByProduct = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.findByProduct(req.params.id);
    res.json(feedbacks[0]);
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

  const product = req.params.id;
  const user = req.body.user;
  const rating = req.body.rating;
  const comment = req.body.comment ?? null;

  try {
    await Feedback.create({ product, user, rating, comment });
    res.status(201).json({ message: "Feedback added successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Feedback.delete(id);

    res.status(200).json({ message: "Product deleted successfully!" });
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

  try {
    const rating = req.body.rating;
    const comment = req.body.comment ?? null;

    await Feedback.update(id, { rating, comment });

    res.status(200).json({ message: "Feedback updated successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
