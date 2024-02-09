// Import the db connection file
const conn = require("../config/db.config");
const dayjs = require("dayjs");

async function generateReport(doneDay) {
    try {
      let nextDay = dayjs(doneDay).add(1, "day").format("YYYY-MM-DD");
      let taskSQL = `SELECT task_id, task_detail, task_completed, done_by FROM task_table WHERE done_date>'${doneDay} 00:00:00' AND  done_date<'${nextDay} 00:00:00'`;
  
      let result = await conn.query(taskSQL);
      return result;
    } catch (error) {
      console.error("Error in fetching task", error);
    }
  }

  module.exports = {generateReport}