// Import the db connection file
const conn = require("../config/db.config");
const dayjs = require("dayjs");

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

async function fetchLater() {
  try {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    let fetchSQL = `SELECT * FROM later_table WHERE completion_time>'${today} 00:00:00' AND  completion_time<'${tomorrow} 00:00:00'`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(fetchSQL);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching later", err);
  }
}

module.exports = { addLater, fetchLater };
