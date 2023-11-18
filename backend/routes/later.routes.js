// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const laterController = require("../controllers/later.controller");

// Create a get request handler for the getDays route
router.post("/later", laterController.addTasksLater);

module.exports = router;
