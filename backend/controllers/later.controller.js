async function addTasksLater(req, res) {
  const { doneDay } = req.body;
  console.log(req.body);

  // try {
  //   let serviceResult = await task2Service.getTasksForSpecificDay(doneDay);
  //   if (serviceResult) {
  //     const response = {
  //       status: "success",
  //       message: "Task fetched successfully",
  //     };

  //     return res.status(200).json(serviceResult);
  //   } else {
  //     const response = {
  //       status: "failure",
  //       message: "Couldn't fetch task",
  //     };
  //     res.status(409).json(response);
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.sendStatus(503);
  // }
}

module.exports = { addTasksLater };
