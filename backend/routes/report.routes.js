// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the report controller
const reportController = require("../controllers/report.controller");

// Create a get request handler for the report route
router.get("/get-report/:doneDay", reportController.generateReport);

module.exports = router;