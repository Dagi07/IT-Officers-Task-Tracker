const dayjs = require("dayjs");
const calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);
const schedule = require("node-cron");

function dayHandler() {
  // Specify the starting date
  const startDate = dayjs("2023-11-14");

  // Get today's date
  const today = dayjs();

  // Calculate the number of days between the starting date and today
  const numberOfDays = today.diff(startDate, "day");

  // Create an array to store the formatted dates
  const dates = [];

  // Iterate over the days and add them to the array
  for (let i = 0; i <= numberOfDays; i++) {
    const currentDate = startDate.add(i, "day");
    dates.push(currentDate.format("YYYY-MM-DD"));
  }

  //   ### dayjs(tempDay).calendar() ###
  // Return the array of formatted dates
  return dates;
}

// Schedule the function to run every 6 hours
schedule.schedule("0 0 * * *", dayHandler);

module.exports = { dayHandler };
