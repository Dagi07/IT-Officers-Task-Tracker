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
async function getAlertAmount() {
  try {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    let fetchSQL = `SELECT COUNT(later_id) FROM later_table WHERE completion_time>'${today} 00:00:00' AND  completion_time<'${tomorrow} 00:00:00'`;
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

async function updateTasksLater(updatedData) {
  const { taskId, taskDetail, completionTime, taskAssignee } = updatedData;
  let completiontime = dayjs(completionTime).format("YYYY-MM-DD hh:mm:ss a");
  try {
    let editSQL = `UPDATE later_table
    SET
      later_detail = ?,
      completion_time = ?,
      task_assignee = ?
    WHERE
      later_id = ?
    `;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(editSQL, [
      taskDetail,
      completiontime,
      taskAssignee,
      taskId,
    ]);

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

async function deleteLater(laterID) {
  try {
    let deleteSQL = `DELETE FROM later_table
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

module.exports = {
  addLater,
  fetchLater,
  getAlertAmount,
  updateTasksLater,
  deleteLater,
};
