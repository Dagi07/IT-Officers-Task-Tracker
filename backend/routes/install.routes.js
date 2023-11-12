// Import express module as express
const express = require('express');
// Import the router module
const router = express.Router();
// Import the install controller
const installController = require('../controllers/install.controller')
// Create a get request handler for the install route
router.get('/createdb', installController.create_db)
// Export the router
module.exports = router;