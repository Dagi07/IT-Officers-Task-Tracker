// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task controller
const taskController = require("../controllers/task.controller");
// Create a post request handler for the task route
router.post("/task", taskController.addTask);
// Create a get request handler for the task route
router.get("/task", taskController.fetchTasks);
router.get("/task/:id", taskController.fetchDayList);
// Create an update request handler for the task route
router.put("/task", taskController.updateTask);
// Create a delete request handler for the task route
router.delete("/task/:id", taskController.deleteTask);

// Export the router
module.exports = router;
