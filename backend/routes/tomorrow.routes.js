// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const tomorrowController = require("../controllers/tomorrow.controller");

// Create a post request handler for the getDays route
router.post("/tomorrow", tomorrowController.addTasksTomorrow);
// Create a get request handler for the getDays route
router.get("/tomorrow", tomorrowController.fetchTasksTomorrow);
// Create a get request handler for the get amount of alert route
router.get("/tomorrow/amount", tomorrowController.getAlertAmount);
// Create a put request handler for the putTomorrow route
router.put("/tomorrow", tomorrowController.updateTasksTomorrow);
// Create a delete request handler for the delete task tomorrow route
router.delete("/tomorrow/:id", tomorrowController.deleteTasksTomorrow);

module.exports = router;
