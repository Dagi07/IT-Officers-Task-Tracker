const task2Service = require("../services/task2.service");

const populateDays = require("../util/dayHandler");

async function getDayssForSidebar(req, res) {
  // console.log(req.body);
  try {
    let serviceResult = await task2Service.getDayssForSidebar();
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };
      // console.log("cont", serviceResult);

      let pd = populateDays.dayHandler();
      // console.log(pd);

      const populateDaysObj = new Object();
      for (i = 0; i < pd.length; i++) {
        populateDaysObj[pd[i]] = serviceResult[i]["COUNT(task_id)"];
      }

      // console.log(populateDaysObj);

      return res.status(200).json(populateDaysObj);
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
async function getTasksForSpecificDay(req, res) {
  const { doneDay } = req.params;

  try {
    let serviceResult = await task2Service.getTasksForSpecificDay(doneDay);
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
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

module.exports = { getDayssForSidebar, getTasksForSpecificDay };
