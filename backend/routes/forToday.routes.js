// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const forTodayController = require("../controllers/forToday.controller");

// // Create a post request handler for the getDays route
// router.post("/for-today", forTodayController.addTasksforToday);
// Create a get request handler for the getDays route
router.get("/for-today", forTodayController.fetchTasksForToday);
// // Create a delete request handler for the delete task forToday route
// router.delete("/for-today/:id", forTodayController.deleteTasksforToday);

module.exports = router;
