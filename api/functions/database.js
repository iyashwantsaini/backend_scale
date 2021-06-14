const util = require("util");
const mysql = require("mysql");
require("dotenv").config();
// SQL connection setup
function connect(sql) {
  sql.connect(function (err) {
    if (err) throw err;
    console.log(`Database Connected!`);
  });
}
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scaler",
  // port: "3306",
});
connect(sql); //connecting to DB
const query = util.promisify(sql.query).bind(sql);
module.exports = query;
