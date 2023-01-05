const db = require("../utils/db");

module.exports = class Card {
  constructor(number, ccv, user, validity, type) {
    this.number = number;
    this.ccv = ccv;
    this.user = user;
    this.validity = validity;
    this.type = type;
  }

  static find(number) {
    return db.execute("SELECT * FROM card WHERE number = ?", [number]);
  }

  static findByUser(user) {
    return db.execute("SELECT * FROM card WHERE user = ?", [user]);
  }

  static create(card) {
    return db.execute(
      "INSERT INTO card (number, ccv, user, validity, type) VALUES(?, ?, ?, ?, ?)",
      [card.number, card.ccv, card.user, card.validity, card.type]
    );
  }

  static update(user, card) {
    return db.execute(
      "UPDATE card SET number = ?, ccv = ? , validity = ?, type = ? WHERE user = ?",
      [card.number, card.ccv, card.validity, card.type, user]
    );
  }
};
