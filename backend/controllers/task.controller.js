// Import the task service to handle the db call commonJS way
const taskService = require("../services/task.service");
const moment = require("moment");

async function addTask(req, res) {
  try {
    const { task_detail, task_completed, done_by } = req.body;
    // console.log(req.body);
    await taskService.addTask(req.body);
    let result = await taskService.fetchTasks();
    if (result) {
      const response = {
        status: "success",
        message: "Task added successfully",
      };
      // console.log(result.length, result)
      return res.status(201).json(result[result.length - 1]);
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

async function fetchTasks(req, res) {
  // console.log(req.body);
  try {
    let result = await taskService.fetchTasks();
    if (result) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };
      // console.log(result.length, result);

      return res.json(result);
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

async function fetchDayList(req, res) {
  // console.log(req.params.id)
  try {
    let result = await taskService.fetchTasks();
    let dayCollector = [];
    if (result) {
      const response = {
        status: "success",
        message: "Task fetched successfully",
      };

      for (let i = 0; i < result.length; i++) {
        if (
          !dayCollector.includes(
            `array${moment(new Date(Date.parse(result[i].done_date))).format(
              "HH"
            )}`
          )
        ) {
          dayCollector.push(
            `array${moment(new Date(Date.parse(result[i].done_date))).format(
              "HH"
            )}`
          );

          return res.json(dayCollector);
        }
      }
      // console.log(result);
      // return days_list;
    } else {
      const response = {
        status: "failure",
        message: "Couldn't fetch task",
      };
      res.status(409).json(response);
    }
    // console.log(dayCollector);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

async function updateTask(req, res) {
  try {
    const { idTask, taskDetail, taskCompleted, doneBy } = req.body;

    let editResult = await taskService.updateTask(
      idTask,
      taskDetail,
      taskCompleted,
      doneBy
    );
    let getResult = await taskService.fetchTasks();

    if (editResult) {
      const response = {
        status: "success",
        message: "Task updated successfully",
      };
      // console.log(result.length, result)
      return res.status(201).json(getResult);
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

module.exports = { addTask, fetchTasks, fetchDayList, updateTask };
