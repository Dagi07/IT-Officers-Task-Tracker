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
    console.error("Error in adding tomorrow", err);
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

async function getAlertAmount() {
  try {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    let fetchSQL = `SELECT COUNT(tomorrow_id) FROM tomorrow_table WHERE completion_time>'${today} 00:00:00' AND  completion_time<'${tomorrow} 00:00:00'`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(fetchSQL);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching tomorrow", err);
  }
}

async function updateTasksTomorrow(updatedData) {
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

async function updateTasksTomorrow(updatedData) {
  const { taskId, taskDetail, completionTime, taskAssignee } = updatedData;
  let completiontime = dayjs(completionTime).format("YYYY-MM-DD hh:mm:ss a");
  try {
    let editSQL = `UPDATE tomorrow_table
    SET
      tomorrow_detail = ?,
      completion_time = ?,
      task_assignee = ?
    WHERE
      tomorrow_id = ?
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
    console.error("Error in fetching tomorrow", err);
  }
}

async function deleteTomorrow(tomorrowID) {
  try {
    let deleteSQL = `DELETE FROM tomorrow_table
    WHERE tomorrow_id = ?`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(deleteSQL, [tomorrowID]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {}
}

module.exports = {
  addTomorrow,
  fetchTomorrow,
  getAlertAmount,
  updateTasksTomorrow,
  deleteTomorrow,
};
