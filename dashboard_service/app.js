// app.js
const express = require('express');
const app = express();
const stockRoutes = require('./routes/stock');
const pinnedRoutes = require('./routes/pin');
require('dotenv').config();

const PORT = process.env.PORT || 5010;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stock routes
app.use('/api/stocks', stockRoutes);
app.use('/api/pin', pinnedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
