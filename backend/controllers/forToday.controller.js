const forTodayService = require("../services/forToday.service");

async function fetchTasksForToday(req, res) {
  try {
    let serviceResult = await forTodayService.fetchForToday();
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Tasks fetched successfully",
      };
      return res.status(200).json(serviceResult);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't fetch task",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

async function getAlertAmount(req, res) {
  try {
    let serviceResult = await forTodayService.getAlertAmount();
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };
      return res.status(200).json(serviceResult[0]["COUNT(tomorrow_id)"]);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't fetch task",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

module.exports = { fetchTasksForToday, getAlertAmount };
