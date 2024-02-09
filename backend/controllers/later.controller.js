const laterService = require("../services/later.service");
const dayjs = require("dayjs");
async function addTasksLater(req, res) {
  try {
    let addserviceResult = await laterService.addLater(req.body);
    if (addserviceResult) {
      let fetchserviceResult = await laterService.fetchLater();
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

async function fetchTasksLater(req, res) {
  try {
    let serviceResult = await laterService.fetchLater();
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
    let serviceResult = await laterService.getAlertAmount();
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };
      return res.status(200).json(serviceResult[0]["COUNT(later_id)"]);
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

async function updateTasksLater(req, res) {
  try {
    let serviceResult = await laterService.updateTasksLater(req.body);
    // console.log(req.body);
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task updated successfully",
      };
      return res.status(200).json(response);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't update task",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

async function deleteTasksLater(req, res) {
  console.log(req.params.id);
  try {
    let delserviceResult = await laterService.deleteLater(req.params.id);
    let fetchserviceResult = await laterService.fetchLater();
    if (delserviceResult) {
      const response = {
        status: "success",
        message: "Task deleted successfully",
      };
      // console.log("-->", fetchserviceResult);
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
  addTasksLater,
  fetchTasksLater,
  getAlertAmount,
  updateTasksLater,
  deleteTasksLater,
};
