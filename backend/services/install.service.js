// Import the db connection file
const conn = require("../config/db.config");
// Import the fs module to read in files
const fs = require("fs");
// A function to install DB directly from the api
async function installDirectFromApi() {
  // Temporary variable, used to store all queries
  let queries = [];
  let finalMessage = {};
  console.log("Installing DB directly from the API");
  // Query file
  const queryfile = __dirname + "/sql/initial-queries.sql";
  // console.log(queryfile);
  let templine = "";
  // Read in entire file
  const lines = await fs.readFileSync(queryfile, "utf-8").split("\n");
  // Loop through each line
  const executed = await new Promise((resolve, reject) => {
    // Iterate over all lines
    lines.forEach((line) => {
      if (line.trim().startsWith("--") || line.trim() === "") {
        // Skip if it's a comment or empty line
        return;
      }
      templine += line;
      if (line.trim().endsWith(";")) {
        // If it has a semicolon at the end, it's the end of the query
        // Perform the query
        const sqlQuery = templine.trim();
        // Add query to the list of queries
        queries.push(sqlQuery);
        templine = "";
      }
    });
    resolve("Queries are added to the list");
  });
  //Loop through the queries and execute them one by one asynchrounously
  for (let i = 0; i < queries.length; i++) {
    try {
      console.log("queries", queries[i]);
      const result = await conn.query(queries[i]);
      console.log("Table created");
    } catch (err) {
      // console.log("Err Occurred - Table not created");
      finalMessage.message = "Not all tables are created" + err;
    }
  }

  console.log(finalMessage);
  if (!finalMessage.message) {
    console.log("here");
    finalMessage.message = "All tables are created";
  }

  return finalMessage;
}

// Export the function
module.exports = {
  installDirectFromApi,
};
