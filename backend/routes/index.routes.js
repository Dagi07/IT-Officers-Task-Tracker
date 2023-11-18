// Import the express module
const express = require("express");
// Import the router module
const router = express.Router();

// Import the install route
const installRoute = require("./install.routes");
// Add the install router to the middleware chain
router.use(installRoute);

// Import the task route
const taskRoute = require("./task.routes");
// Add the task router to the middleware chain
router.use(taskRoute);
// Import the task2 route
const task2Route = require("./task2.routes");
// Add the task2 router to the middleware chain
router.use(task2Route);
// Import the later route
const laterRoute = require("./later.routes");
// Add the later router to the middleware chain
router.use(laterRoute);

module.exports = router;
