// Import the task service to handle the db call commonJS way
const taskService = require("../services/task.service");
const task2Service = require("../services/task2.service");
const moment = require("moment");
const dayjs = require("dayjs");

async function addTask(req, res) {
  try {
    const { task_detail, task_completed, done_by } = req.body;
    // console.log(req.body);
    let addResult = await taskService.addTask(req.body);
    let getresult = await taskService.fetchTasks();

    if (addResult) {
      const response = {
        status: "success",
        message: "Task added successfully",
      };
      // console.log(result.length, result)

      // const backendResponse = {
      let getResult = getresult[getresult.length - 1];

      // }
      return res.status(201).json(getResult);
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
    const { task_detail, task_completed, done_by, task_id } = req.body;

    let checkDate = await taskService.getTaskToEdit(task_id);

    const today = dayjs();
    const dateToCheck = dayjs(checkDate[0].done_date);
    const daysDifference = dateToCheck.diff(today, "day");

    if (daysDifference !== 0) {
      const response = {
        status: "forbidden",
        message:
          "Modifications to this field are not permitted after 24hrs following task completion.",
      };

      let getTaskbyId = await taskService.getTaskByID(task_id)
      if (getTaskbyId[0].task_detail !== task_detail) {
        response.field = "taskDetail";
        return res.status(403).json(response);
      } else if (getTaskbyId[0].done_by !== done_by) {
        response.field = "doneBy";
        return res.status(403).json(response);
      }
      
    }

    let editResult = await taskService.updateTask(
      task_detail,
      task_completed,
      done_by,
      task_id
    );

    if (editResult) {
      let getResult = await taskService.fetchTasks();
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

async function deleteTask(req, res) {
  try {
    let deleteResult = await taskService.deleteTask(req.params.id);
    // let getResult = await taskService.fetchTasks();
    if (deleteResult) {
      const response = {
        status: "success",
        message: "Task deleted successfully",
      };
      console.log("getResult", deleteResult);
      // if (getResult) {
      return res.status(200).json(response);
      // }
    } else {
      const response = {
        status: "failure",
        message: "Couldn't delete task",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

module.exports = { addTask, fetchTasks, fetchDayList, updateTask, deleteTask };
