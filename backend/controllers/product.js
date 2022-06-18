const { validationResult } = require("express-validator");

const Product = require("../models/product");

exports.get = async (req, res, next) => {
  try {
    const products = await Product.get();
    res.json(products[0]);
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
  const description = req.body.description ?? null;
  const image = req.body.image ?? null; // change to files.path
  const price = req.body.price;
  const category = req.body.category;

  try {
    await Product.create({ name, description, image, price, category });
    res.status(201).json({ message: "Product created successfully!" });
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
    await Product.delete(id);

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
    const productRes = await Product.find(id);
    const product = productRes[0].pop();

    const name = req.body.name || product.name;
    const description = req.body.description || product.description;
    const image = req.body.image || product.image; // change to files.path
    const price = req.body.price || product.price;
    const category = req.body.category || product.category;

    await Product.update(id, { name, description, image, price, category });

    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
