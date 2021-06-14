const express = require("express");
require("dotenv").config();
const router = express.Router();

const query = require("../functions/database"); //for querying the DB

//Get All Users
router.get("/getUsers", async (req, res, next) => {
  try {
    let allUsers = await query("SELECT * FROM users");
    res.status(200).json({ data: allUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
