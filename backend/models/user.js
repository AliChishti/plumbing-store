const db = require("../utils/db");

module.exports = class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static find(email, username) {
    return db.execute("SELECT * FROM user WHERE email = ? OR username = ?", [
      email,
      username,
    ]);
  }

  static create(user) {
    return db.execute("INSERT INTO user (username, email, password) VALUES(?, ?, ?);", [
      user.username,
      user.email,
      user.password,
    ]);
  }
};
