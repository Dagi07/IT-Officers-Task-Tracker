// Import the dotenv module
require("dotenv").config();

// Import the db connection file
const conn = require("../config/db.config");

const dayjs = require("dayjs");
const populateDays = require("../util/dayHandler");

let pd = populateDays.dayHandler();
// console.log(pd.length);

async function getDayssForSidebar() {
  try {
    let dayMap = await Promise.all(
      pd.map((day) => {
        let nextDay = dayjs(day).add(1, "day").format("YYYY-MM-DD");
        let daySQL = `SELECT COUNT(task_id) FROM task_table WHERE done_date>'${day} 00:00:00' AND  done_date<'${nextDay} 00:00:00'`;

        let result = conn.query(daySQL);
        return result;
      })
    );
    // Access the actual result from each element in dayMap
    let actualResults = dayMap.map((result) => result[0]);

    return actualResults;
  } catch (error) {
    console.error("Error in fetching task", error);
  }
}
async function getTasksForSpecificDay(doneDay) {
  try {
    let nextDay = dayjs(doneDay).add(1, "day").format("YYYY-MM-DD");
    let taskSQL = `SELECT * FROM task_table WHERE done_date>'${doneDay} 00:00:00' AND  done_date<'${nextDay} 00:00:00'`;

    let result = conn.query(taskSQL);
    return result;
  } catch (error) {
    console.error("Error in fetching task", error);
  }
}

module.exports = { getDayssForSidebar, getTasksForSpecificDay };
