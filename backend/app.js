// Import the express module
const express = require("express");
const dayHandler = require("./util/dayHandler");
let dh = dayHandler.dayHandler();
// console.log(dh[0]);

// console.log(pdd.getDayssForSidebar());

// Import the dotenv module
require("dotenv").config();
// Import the CORS package
const cors = require("cors");

// save imported express to app variable
let app = express();
// Add the CORS middleware to the middleware chain
app.use(cors());

// Set up the port to listen to
const port = process.env.port;

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Import the index routes
const allRoutes = require("./routes/index.routes");
// Add the routes index file to the middleware chain
app.use(allRoutes);

// const pdd = require("./controllers/task2.controller");

// Set up the listener
app.listen(port, () => {
  console.log(`Listening at ${process.env.host}:${port}...`);
});
