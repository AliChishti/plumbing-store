const { validationResult } = require("express-validator");

const Card = require("../models/card");

exports.findByUser = async (req, res, next) => {
  try {
    const cards = await Card.findByUser(req.userId);
    res.json(cards[0][0]);
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
  console.log(req.body);
  const number = req.body.number;
  const ccv = req.body.ccv;
  const validity = req.body.validity;
  const type = req.body.type;
  const user = req.userId;

  try {
    await Card.create({ number, user, ccv, validity, type });
    res.status(201).json({ message: "Card added successfully!" });
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

  try {
    const number = req.body.number;
    const ccv = req.body.ccv;
    const validity = req.body.validity;
    const type = req.body.type;
    const user = req.body.user;

    await Card.update(user, { number, ccv, validity, type });

    res.status(200).json({ message: "Card updated successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
