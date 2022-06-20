const { validationResult } = require("express-validator");

const Category = require("../models/category");

exports.get = async (req, res, next) => {
  try {
    const categories = await Category.get();

    res.json(categories[0]);
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

  const name = req.body.name;

  try {
    await Category.create(name);

    res.status(201).json({ message: "Category created successfully!" });
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
    await Category.delete(id);

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;
  const newName = req.body.name;

  try {
    await Category.update(id, newName);

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
