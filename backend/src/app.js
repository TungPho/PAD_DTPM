const express = require("express");
const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
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

// tìm máy theo id

// create a new machine
app.post("/machines", async (req, res, next) => {
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

// create a new bill
app.post("/bills", async (req, res, next) => {
  const { customer_id, machine_id, total_time, total_price, bill_items_array } =
    req.body;
  // create a new bill
  const insertBillQuery = `INSERT INTO Bills (customer_id, machine_id, total_time, total_price)
    OUTPUT inserted.bill_id
    VALUES 
    (${customer_id}, ${machine_id}, ${total_time}, ${total_price});
    `;
  const results = (await new mssql.Request().query(insertBillQuery))
    .recordset[0];
  const { bill_id } = results;
  //create all bill details
  for (let i = 0; i < bill_items_array.length; i++) {
    const insertBillDetailsQuery = `INSERT INTO BillDetails (bill_id, service_id, quantity, total_price)
     VALUES
     (${bill_id}, ${bill_items_array[i].service_id},  ${bill_items_array[i].quantity},  ${bill_items_array[i].total_price});`;
    await new mssql.Request().query(insertBillDetailsQuery);
  }

  try {
    return res.status(200).json({
      message: "Create a new bill success",
      metadata: results,
    });
  } catch (error) {}
});

module.exports = app;
