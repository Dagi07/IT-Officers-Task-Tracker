const tomorrowService = require("../services/tomorrow.service");
async function addTasksTomorrow(req, res) {
  console.log(req.body);
  try {
    let addserviceResult = await tomorrowService.addTomorrow(req.body);
    if (addserviceResult) {
      let fetchserviceResult = await tomorrowService.fetchTomorrow();
      const response = {
        status: "success",
        message: "Task added successfully",
      };
      // console.log(serviceResult);
      return res.status(201).json(fetchserviceResult);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't add task",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

async function fetchTasksTomorrow(req, res) {
  try {
    let serviceResult = await tomorrowService.fetchTomorrow();
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

async function getAlertAmount(req, res) {
  try {
    let serviceResult = await tomorrowService.getAlertAmount();
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

async function deleteTasksTomorrow(req, res) {
  console.log(req.params);
  try {
    let delserviceResult = await tomorrowService.deleteTomorrow(req.params.id);
    let fetchserviceResult = await tomorrowService.fetchTomorrow();
    if (delserviceResult) {
      const response = {
        status: "success",
        message: "Task deleted successfully",
      };

      return res.status(200).json(fetchserviceResult);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't delete task",
      };
      res.status(409).json(response);
    }
  } catch (error) {}
}

module.exports = {
  addTasksTomorrow,
  fetchTasksTomorrow,
  getAlertAmount,
  deleteTasksTomorrow,
};
