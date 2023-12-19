const reportService = require("../services/report.service");

async function generateReport(req, res) {
    // console.log(req.body);
    try {
      let serviceResult = await reportService.generateReport();
      if (serviceResult) {
        const response = {
          status: "success",
          message: "Task fetched successfully",
        };
        
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