const reportService = require("../services/report.service");
const pdf = require('html-pdf');

const pdfTemplate = require('../documents');

async function generateReport(req, res) {
    try {
      let serviceResult = await reportService.generateReport(req.params.doneDay);
      if (serviceResult) {
        pdf.create(pdfTemplate(serviceResult, req.params.doneDay), {}).toFile(`./documents/generatedPDFs/${req.params.doneDay}_report.pdf`, (err) => {
          if(err) {
              res.send(Promise.reject());
          }
  
          res.send(Promise.resolve());

      });
        const response = {
          status: "failure",
          message: "Couldn't fetch task",
        };
        // return res.status(200).json(response);
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

  module.exports = {generateReport};