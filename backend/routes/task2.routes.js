// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const task2Controller = require("../controllers/task2.controller");

// Create a get request handler for the task2 route
router.get("/getDays", task2Controller.getDayssForSidebar);

module.exports = router;
