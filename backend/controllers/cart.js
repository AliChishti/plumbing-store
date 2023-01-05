const { validationResult } = require("express-validator");

const Cart = require("../models/cart");
const Product = require("../models/product");

exports.findByUser = async (req, res, next) => {
  try {
    const cart = await Cart.findByUser(req.userId);
    let items = null;
    if (cart[0][0].items) {
      items = JSON.parse(cart[0][0].items);
    }
    const cartData = { user: cart[0][0].user, id: cart[0][0].id, items };

    res.json(cartData);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.increaseQuantity = async (req, res, next) => {
  const product = req.body.product;

  try {
    const cart = await Cart.findByUser(req.userId);
    const cartItems = JSON.parse(cart[0][0].items);
    cartItems.forEach((item) => {
      if (item.id == product) {
        item.quantity += 1;
      }
    });
    await Cart.update(req.userId, { items: JSON.stringify(cartItems) });
    res.status(200).json({ message: "Cart updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.decreaseQuantity = async (req, res, next) => {
  const product = req.body.product;

  try {
    const cart = await Cart.findByUser(req.userId);
    const cartItems = JSON.parse(cart[0][0].items);
    cartItems.forEach((item) => {
      if (item.id == product) {
        item.quantity -= 1;
      }
    });
    await Cart.update(req.userId, { items: JSON.stringify(cartItems) });
    res.status(200).json({ message: "Cart updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.removeItem = async (req, res, next) => {
  const product = req.body.product;

  const cart = await Cart.findByUser(req.userId);
  let cartItems = JSON.parse(cart[0][0].items);
  cartItems = cartItems.filter((item) => item.id !== product);
  const updatedCart = await Cart.update(req.userId, { items: JSON.stringify(cartItems) });
  res.json(updatedCart)
};

exports.update = async (req, res, next) => {
  const product = req.body.product;

  try {
    const cart = await Cart.findByUser(req.userId);
    let cartItems = cart[0][0].items;

    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    }

    if (!cartItems) {
      cartItems = [];
    }

    const itemPresent = cartItems.filter((item) => item.id === product);
    if (itemPresent.length > 0) {
      res.status(200).json({ message: "Item already added" });
      return;
    }

    const productData = await Product.find(product);
    cartItems.push({
      id: productData[0][0].id,
      name: productData[0][0].name,
      price: productData[0][0].price,
      quantity: 1,
    });

    await Cart.update(req.userId, { items: JSON.stringify(cartItems) });
    res.status(200).json({ message: "Cart updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
