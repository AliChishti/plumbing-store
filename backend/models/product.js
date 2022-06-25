const db = require("../utils/db");

module.exports = class Product {
  constructor(name, description, image, price, category) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.category = category;
  }

  static get() {
    return db.execute("SELECT p.id , p.name , p.description , p.image , p.price , c.name as category FROM product p INNER JOIN category c on c.id = p.category;");
  }

  static find(id) {
    return db.execute("SELECT * FROM product WHERE id = ?", [id]);
  }

  static search(product, category){
    return db.execute("SELECT p.id , p.name , p.description , p.image , p.price , c.name as category FROM product p INNER JOIN category c on c.id = p.category WHERE p.name LIKE ? OR `category` = ?", ['%' + product + '%', category]);
  }

  static findByName(name) {
    return db.execute("SELECT * FROM product WHERE name = ?", [name]);
  }

  static create(product) {
    return db.execute(
      "INSERT INTO product (name, description, image, price, category) VALUES(?, ?, ?, ?, ?)",
      [
        product.name,
        product.description,
        product.image,
        product.price,
        product.category,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM product WHERE id = ?", [id]);
  }

  static update(id, product) {
    return db.execute(
      "UPDATE product SET name = ?, description = ?, image = ?, price = ?, category = ? WHERE id = ?",
      [
        product.name,
        product.description,
        product.image,
        product.price,
        product.category,
        id,
      ]
    );
  }
};
