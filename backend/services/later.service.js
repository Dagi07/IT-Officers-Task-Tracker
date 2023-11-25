// Import the db connection file
const conn = require("../config/db.config");

async function addLater(addedLaterData) {
  try {
    let addSQL = `INSERT INTO later_table(later_detail, task_assignee, completion_time)VALUES(?,?,?)`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(addSQL, [
      addedLaterData.taskDetail,
      addedLaterData.taskAssignee,
      addedLaterData.completionTime,
    ]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in adding later", err);
  }
}

module.exports = { addLater };
