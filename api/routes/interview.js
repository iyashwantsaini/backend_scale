const express = require("express");
require("dotenv").config();
const router = express.Router();

const query = require("../functions/database"); //for querying the DB
const mailer = require("../functions/nodemailer");
const processdb = require("./processdb");

//Get all Interviews Scheduled
router.get("/allInterviews", async (req, res, next) => {
  try {
    let result = await query("SELECT * FROM interviews;");
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Delete scheduled interview
router.delete("/deleteInterview/:id", async (req, res, next) => {
  const { id } = req.params;
  const processobj = processdb.initiate();
  const result = processobj.deleteInterview(id);
  result
    .then((data) => res.json({ success: data }))
    .catch((err) => console.log(err));
});

// Add new interview
router.post("/insertInterview", async (req, res, next) => {
  try {
    const { email1, email2, endTime, startTime } = req.body;
    const processobj = processdb.initiate();
    const result = processobj.insertInterview(
      email1,
      email2,
      startTime,
      endTime
    );
    mailer(email1, email2, startTime);
    result
      .then((data) => response.json({ data: data }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Update interview
router.patch("/updateInterview", async (req, res, next) => {
  try {
    const { id, email1, email2, endTime, startTime } = req.body;
    const processobj = processdb.initiate();
    const result = processobj.updateInterview(
      id,
      email1,
      email2,
      startTime,
      endTime
    );
    mailer(email1, email2, startTime);
    result
      .then((data) => response.json({ data: data }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/accessinterview/:id/:email/", async (req, res, next) => {
  try {
    const { id } = req.params;
    let result = await query(`SELECT * FROM interviews where id=${id};`);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
