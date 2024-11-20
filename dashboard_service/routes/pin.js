// routes/stock.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to add stock for a user
router.post('/pinStock', (req, res) => {
  const { userId, stockName } = req.body;

  const query = `
    INSERT INTO pinned (user_id, stock_name)
    VALUES (?, ?)
  `;

  db.query(query, [userId, stockName], (error, results) => {
    if (error) {
      console.error('Error inserting stock:', error.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Stock pinned successfully', stockId: results.insertId });
    }
  });
});

router.get('/getPinnedStocks', (req,res) => {
  try {
    // Query the database for all stock records
    db.query("SELECT * FROM pinned where user_id = ?", [req.query.user_id], (error, results) => {
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

router.delete('/pinnedDelete/:user_id', (req,res) => {
    try {
      // Query the database for all stock records
      db.query("DELETE FROM pinned WHERE user_id = ?", [req.params.user_id], (error, results) => {
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
