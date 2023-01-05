const db = require("../utils/db");

module.exports = class Feedback {
  constructor(product, user, rating, comment) {
    this.product = product;
    this.user = user;
    this.rating = rating;
    this.comment = comment;
  }

  static find(id) {
    return db.execute("SELECT * FROM feedback WHERE id = ?", [id]);
  }

  static findByProduct(product) {
    return db.execute("SELECT * FROM feedback WHERE product = ?", [product]);
  }

  static findByUser(user) {
    return db.execute("SELECT * FROM feedback WHERE user = ?", [user]);
  }

  static findByUserAndProduct(user, product) {
    return db.execute("SELECT * FROM feedback WHERE user = ? AND product = ?", [
      user,
      product,
    ]);
  }

  static getProductsRatings() {
    return db.execute(
      "SELECT p.id , AVG(f.rating) as rating FROM product p LEFT JOIN feedback f ON f.product = p.id GROUP BY p.id"
    );
  }

  static create(feedback) {
    return db.execute(
      "INSERT INTO feedback (product, user, rating, comment) VALUES(?, ?, ?, ?)",
      [feedback.product, feedback.user, feedback.rating, feedback.comment]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM feedback WHERE id = ?", [id]);
  }

  static update(id, feedback) {
    return db.execute(
      "UPDATE feedback SET comment = ?, rating = ? WHERE id = ?",
      [feedback.comment, feedback.rating, id]
    );
  }
};
