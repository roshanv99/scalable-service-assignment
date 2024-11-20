// routes/stock.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to add stock for a user
router.post('/addToDashboard', (req, res) => {
  console.log("HIT 2")

  const { userId, stockName, buyingPrice, date, quantity } = req.body;

  const query = `
    INSERT INTO stocks (user_id, stock_name, buying_price, date, quantity)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, stockName, buyingPrice, date, quantity], (error, results) => {
    if (error) {
      console.error('Error inserting stock:', error.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Stock added successfully', stockId: results.insertId });
    }
  });
});

router.get('/getDashboardStocks', (req,res) => {
  try {
    console.log("HIT 2")
    // Query the database for all stock records
    db.query("SELECT * FROM stocks where user_id = ?", [req.query.user_id], (error, results) => {
      if (error) {
        console.error('Error inserting stock:', error.message);
        console.error("Error fetching stock records:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch stock records",
            error: error.message,
        });
      } else {
        console.log("Rows: ", results)
      // Return the records as JSON
      res.status(200).json({
        success: true,
        data: results,
        });
      }
    });
   
  } catch (error) {
      console.error("Error fetching stock records:", error);
      res.status(500).json({
          success: false,
          message: "Failed to fetch stock records",
          error: error.message,
      });
  }
});

router.delete('/dashboardDelete/:user_id', (req,res) => {
  try {
    // Query the database for all stock records
    db.query("DELETE FROM stocks WHERE user_id = ?", [req.params.user_id], (error, results) => {
      if (error) {
        console.error('Error delete stock:', error.message);
        console.error("Error delete stock records:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete stock records",
            error: error.message,
        });
      } else {
        console.log("Rows: ", results)
      // Return the records as JSON
      res.status(200).json({
        success: true,
        data: results,
        });
      }
    });
   
  } catch (error) {
      console.error("Error deleting stock records:", error);
      res.status(500).json({
          success: false,
          message: "Failed to delete stock records",
          error: error.message,
      });
  }
});

module.exports = router;
