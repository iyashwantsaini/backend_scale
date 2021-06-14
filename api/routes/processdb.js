const mysql = require("mysql");
const validate = require("../functions/validate"); //for timing validation
const convertDateTime = require("../functions/convertdate"); //convert date to required format
let instance = null;

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

class index {
  static initiate() {
    return instance ? instance : new index();
  }
  async deleteInterview(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM interviews WHERE id = ?";
        sql.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async insertInterview(email1, email2, startTime, endTime) {
    try {
      const start = convertDateTime(startTime);
      const end = convertDateTime(endTime);
      const check1 = await validate(email1, start, end);
      const check2 = await validate(email2, start, end);

      

      if (check1 < 0 || check2 < 0) {
        // console.log("Interviewer Not available at that time");
        return {
          id: -1,
        };
        // } else if (check2 > 0) {
        //   console.log("Interviewee Not available at that time");
        //   return {
        //     id: -2,
        //   };
      } else {
        const insertId = await new Promise((resolve, reject) => {
          const query =
            "INSERT INTO interviews (email1, email2, startTime, endTime) VALUES (?,?,?,?);";
          sql.query(query, [email1, email2, start, end], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          });
        });
        return {
          id: insertId,
          email1: email1,
          email2: email2,
          startTime: startTime,
          endTime: endTime,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateInterview(id, email1, email2, startTime, endTime) {
    try {
      id = parseInt(id, 10);
      const start = convertDateTime(startTime);
      const end = convertDateTime(endTime);
      const check1 = await validate(email1, start, end, id);
      const check2 = await validate(email2, start, end, id);

      if (check1 > 0) {
        console.log("Interviewer Not available at that time");
        return {
          id: -1,
        };
      } else if (check2 > 0) {
        console.log("Interviewee Not available at that time");
        return {
          id: -2,
        };
      } else {
        const response = await new Promise((resolve, reject) => {
          const query =
            "UPDATE interviews SET startTime = ?, endTime = ? WHERE id = ?";

          sql.query(query, [start, end, id], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          });
        });
        return {
          id: 1,
        };
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = index;
