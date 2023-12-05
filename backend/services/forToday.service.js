// Import the db connection file
const conn = require("../config/db.config");
const dayjs = require("dayjs");

async function fetchForToday() {
  try {
    let today = dayjs().format("YYYY-MM-DD");
    let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    console.log(yesterday);
    let fetchSQL = `SELECT * FROM tomorrow_table WHERE registered_date>'${yesterday} 00:00:00' AND  registered_date<'${today} 00:00:00'`;
    // Execute the query (use the query method from the db connection file)
    let result = await conn.query(fetchSQL);

    // If the query returns a result, return the result. Otherwise, return null
    if (result) {
      console.log("fortoday", result);
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error in fetching later", err);
  }
}

module.exports = { fetchForToday };
