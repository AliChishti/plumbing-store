const db = require("../utils/db");

module.exports = class Order {
  constructor(user, detail, status, price) {
    this.user = user;
    this.detail = detail;
    this.status = status;
    this.price = price;
  }

  static fetchAll(){
    return db.execute("SELECT * FROM order");
  }

  static find(id) {
    return db.execute("SELECT * FROM order WHERE id = ?", [id]);
  }

  static findByUser(user) {
    return db.execute("SELECT * FROM order WHERE user = ?", [user]);
  }

  static create(order) {
    return db.execute( 
      "INSERT INTO `order` (user, detail, status, price) VALUES(?, ?, ?, ?)",
      [order.user, order.detail, order.status, order.price]
    );
  }

  static update(id, order) {
    return db.execute("UPDATE order SET status = ? WHERE id = ?", [
      order.status,
      id,
    ]);
  }
};
