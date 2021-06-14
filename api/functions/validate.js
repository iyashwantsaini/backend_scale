const mysql = require("mysql");
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scaler",
  // port: "3306",
});

sql.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + sql.state);
});

async function validate(email, start, end, id) {
  try {

    var inthour=start.split(" ")[1].split(":")[0];
    var intmin=start.split(" ")[1].split(":")[1];
    var intdate=start.split(" ")[0].split("-")[1];
    var today = new Date();
    var currhour=today.getHours();
    var currmin=today.getMinutes();
    var currdate=today.getDate();

    if(currhour>inthour||currmin>intmin||intdate<currdate){
      console.log("error in int timing");
      return -1;
    }

    return 0;


  } catch (error) {
    console.log(error);
  }
}

module.exports = validate;
