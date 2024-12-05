const express = require("express");
const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());

// get Services
app.get("/services", async (req, res, next) => {
  const results = (
    await new mssql.Request().query(`SELECT * FROM dbo.Services`)
  ).recordset;
  try {
    return res.status(200).json({
      message: "GET services success",
      metadata: results,
    });
  } catch (error) {}
});

// create bills
app.post("/bills", async (req, res, next) => {
  const {} = req.body;
  const results = (
    await new mssql.Request().query(`SELECT * FROM dbo.Services`)
  ).recordset;
  try {
    return res.status(200).json({
      message: "Create a new bill success",
      metadata: results,
    });
  } catch (error) {}
});

module.exports = app;
