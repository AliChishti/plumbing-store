const db = require("../utils/db");

module.exports = class Category {
  constructor(name) {
    this.name = name;
  }

  static get() {
    return db.execute("SELECT * FROM category");
  }

  static find(id) {
    return db.execute("SELECT * FROM category WHERE id = ?", [id]);
  }

  static findByName(name) {
    return db.execute("SELECT * FROM category WHERE name = ?", [name]);
  }

  static create(name) {
    return db.execute("INSERT INTO category (name) VALUES(?)", [name]);
  }

  static delete(id) {
    return db.execute("DELETE FROM category WHERE id = ?", [id]);
  }

  static update(id, newName) {
    return db.execute("UPDATE category SET name = ? WHERE id = ?", [
      newName,
      id,
    ]);
  }
};
