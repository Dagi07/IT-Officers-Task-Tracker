// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const task2Controller = require("../controllers/task2.controller");

// Create a get request handler for the getDays route
router.get("/getDays", task2Controller.getDayssForSidebar);
// Create a get request handler for the getDays route
router.get("/getTasks/:doneDay", task2Controller.getTasksForSpecificDay);

module.exports = router;
