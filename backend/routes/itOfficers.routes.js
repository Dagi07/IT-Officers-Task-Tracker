// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const itOfficersController = require("../controllers/itOfficers.controller");

// Create a post request handler for the postDays route
router.post("/add-itofficer", itOfficersController.addItOfficers);

module.exports = router;
