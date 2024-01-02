// Import the db connection file
const conn = require("../config/db.config");

async function addItOfficers(itOfficerData) {
  const { firstName, lastName, email, phone, jobTitle } = itOfficerData;
  try {
    let addSQL = `INSERT INTO employee(first_name, last_name, email, phone, job_title)VALUES(?,?,?,?,?)`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(addSQL, [
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
    ]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in adding task", err);
  }
}
// addItOfficers();
module.exports = { addItOfficers };
