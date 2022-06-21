const db = require("../utils/db");

module.exports = class Cart {
  constructor(user, items) {
    this.user = user;
    this.items = items;
  }

  static find(id) {
    return db.execute("SELECT * FROM cart WHERE id = ?", [id]);
  }

  static findByUser(user) {
    return db.execute("SELECT * FROM cart WHERE user = ?", [user]);
  }

  static create(cart) {
    return db.execute("INSERT INTO cart (user, items) VALUES(?, ?)", [
      cart.user,
      cart.items,
    ]);
  }

  static delete(id) {
    return db.execute("DELETE FROM cart WHERE id = ?", [id]);
  }

  static update(user, cart) {
    return db.execute("UPDATE cart SET items = ? WHERE user = ?", [
      cart.items,
      user,
    ]);
  }
};
