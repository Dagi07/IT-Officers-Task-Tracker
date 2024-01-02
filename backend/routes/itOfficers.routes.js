// Import express module as express
const express = require("express");
// Import the router module
const router = express.Router();
// Import the task2 controller
const itOfficersController = require("../controllers/itOfficers.controller");

// Create a post request handler for the add it officers route
router.post("/add-itofficer", itOfficersController.addItOfficers);
// Create a get request handler for the get it officers route
router.get("/fetch-itofficer", itOfficersController.fetchItOfficers);
// Create a delete request handler for the delete it officers route
router.delete("/delete-itofficer/:id", itOfficersController.deleteItOfficer);

module.exports = router;
