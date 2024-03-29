// Import the db connection file
const conn = require("../config/db.config");
// A function to handle the add registration request
async function addTask(addedTaskData) {
  try {
    let addSQL = `INSERT INTO task_table(task_detail, task_completed, done_by)VALUES(?,?,?)`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(addSQL, [
      addedTaskData.task_detail,
      addedTaskData.task_completed,
      addedTaskData.done_by,
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

async function fetchTasks() {
  try {
    let getSQL = `SELECT * FROM task_table`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(getSQL);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching task", err);
  }
}
async function getTaskToEdit(task_id) {
  try {
    let getSQL = `SELECT done_date FROM task_table WHERE task_id = ?`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(getSQL, [task_id]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching task", err);
  }
}
async function getTaskByID(task_id) {
  try {
    let getSQL = `SELECT * FROM task_table WHERE task_id = ?`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(getSQL, [task_id]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching task", err);
  }
}

async function updateTask(task_detail, task_completed, done_by, task_id) {
  try {
    let editSQL = `UPDATE task_table
    SET
      task_detail = ?,
      task_completed = ?,
      done_by = ?
    WHERE
      task_id = ?
    `;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(editSQL, [
      task_detail,
      task_completed,
      done_by,
      task_id,
    ]);
    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in updatin task", err);
  }
}

async function deleteTask(deletedId) {
  try {
    let deleteSQL = `DELETE FROM task_table
    WHERE task_id = ?`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(deleteSQL, [deletedId]);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in deletin task", err);
  }
}

module.exports = { addTask, fetchTasks, getTaskToEdit, getTaskByID, updateTask, deleteTask };
