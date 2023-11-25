const laterService = require("../services/later.service");
async function addTasksLater(req, res) {
  try {
    let serviceResult = await laterService.addLater(req.body);
    if (serviceResult) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };
      console.log(serviceResult);
      return res.status(201).json(serviceResult);
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

module.exports = { addTasksLater };
