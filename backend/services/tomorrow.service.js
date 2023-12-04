// Import the db connection file
const conn = require("../config/db.config");
const dayjs = require("dayjs");

async function addTomorrow(addedTomorrowData) {
  try {
    let addSQL = `INSERT INTO tomorrow_table(tomorrow_detail, task_assignee, completion_time)VALUES(?,?,?)`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(addSQL, [
      addedTomorrowData.taskDetail,
      addedTomorrowData.taskAssignee,
      addedTomorrowData.completionTime,
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

async function fetchTomorrow() {
  try {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    let fetchSQL = `SELECT * FROM tomorrow_table WHERE completion_time>'${today} 00:00:00' AND  completion_time<'${tomorrow} 00:00:00'`;
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

async function deleteTomorrow(laterID) {
  try {
    let deleteSQL = `DELETE FROM tomorrow_table
    WHERE later_id = ?`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(deleteSQL, [laterID]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {}
}

module.exports = { addTomorrow, fetchTomorrow, deleteTomorrow };
