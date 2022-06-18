const mysql = require("mysql2");

const config = require("../config/config.json");

const db = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
});

module.exports = db.promise();
