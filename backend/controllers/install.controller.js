// Import the install service using require
const installService = require('../services/install.service');
// A function to handle the install request
async function create_db(req, res) {
    console.log("Installing DB");
    // Call the install service to run the initial SQL queries
    const installQuery = await installService.installDirectFromApi();
    // If the queries are executed successfully, return success response. Otherwise, return failure response
    if (installQuery) {
       // Send a success response back to the client
       const response = {
        status: 'success',
        message: "DB Created!",
      };
      res.status(200).json(response);
    } else {
       // Send a failur response back to the client
       const response = {
        status: "failure",
        message: "Tables could not be created",
      };
      res.status(403).json(response);
    }
}
// Export the function
module.exports={create_db};