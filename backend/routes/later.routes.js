// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const laterController = require("../controllers/later.controller");

// Create a post request handler for the getDays route
router.post("/later", laterController.addTasksLater);
// Create a get request handler for the getDays route
router.get("/later", laterController.fetchTasksLater);
// Create a get request handler for the get amount of alert route
router.get("/later/amount", laterController.getAlertAmount);
// Create a put request handler for the putDays route
router.put("/later", laterController.updateTasksLater);
// Create a delete request handler for the delete task later route
router.delete("/later/:id", laterController.deleteTasksLater);

module.exports = router;
