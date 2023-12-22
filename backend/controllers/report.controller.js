const reportService = require("../services/report.service");
const pdf = require("html-pdf");
const path = require("path");

const pdfTemplate = require("../documents");

async function generateReport(req, res) {
  try {
    let serviceResult = await reportService.generateReport(req.params.doneDay);
    if (serviceResult) {
      pdf
        .create(pdfTemplate(serviceResult, req.params.doneDay), {})
        .toFile(
          `./documents/generatedPDFs/${req.params.doneDay}_report.pdf`,
          (err) => {
            if (err) {
              res.send(Promise.reject());
            }
            console.log("pdf created");
            // res.send(Promise.resolve());
            // Assuming filePath contains the path to the file you want to send
            const filePath = "../documents/generatedPDFs/"; // Replace this with your file path

            // Resolve the absolute path using path.join()
            const absolutePath = path.join(__dirname, filePath);

            return res.download(
              `${absolutePath}${req.params.doneDay}_report.pdf`,
              "report.pdf"
            );
          }
        );
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

module.exports = { generateReport };
