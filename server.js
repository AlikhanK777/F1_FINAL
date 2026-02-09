require('dotenv').config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const app = express();

// CORS Configuration
app.use(cors()); 

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// Use DB_URL from .env file or fallback to local MongoDB
const dbUri = process.env.DB_URL || `mongodb://localhost:27017/f1_final_db`;

db.mongoose.connect(dbUri)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit();
  });

// Routes Management
require('./app/routes/auth.routes')(app);
require('./app/routes/driver.routes')(app);
require('./app/routes/user.routes')(app);

// Root Endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to F1 Management System API." });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});