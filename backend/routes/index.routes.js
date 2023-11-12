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

module.exports = router;