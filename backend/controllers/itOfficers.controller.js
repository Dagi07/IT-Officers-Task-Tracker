const itOfficersService = require("../services/itOfficers.service");

async function addItOfficers(req, res) {
  try {
    let serviceResult = await itOfficersService.addItOfficers(req.body);
    if (serviceResult) {
      const response = {
        status: "success",
        message: "IT Officer added successfully",
      };
      return res.status(201).json(response);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't add IT Officer",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

module.exports = { addItOfficers };
