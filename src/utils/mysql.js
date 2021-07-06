require("dotenv").config();
const mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
});

function connection() {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
  });
}

module.exports = {
  connection: connection,
}
