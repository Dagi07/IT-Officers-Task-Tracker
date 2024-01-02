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

async function fetchItOfficers(req, res) {
  try {
    let serviceResult = await itOfficersService.fetchItOfficers();
    if (serviceResult) {
      const response = {
        status: "success",
        message: "IT Officers fetched successfully",
      };
      return res.status(200).json(serviceResult);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't fetch IT Officers",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

async function deleteItOfficer(req, res) {
  const itGuyId = req.params.id;
  try {
    let serviceResult = await itOfficersService.deleteItOfficer(itGuyId);
    if (serviceResult) {
      const response = {
        status: "success",
        message: "IT Officer deleted successfully",
      };
      let updateList = await itOfficersService.fetchItOfficers();
      return res.status(200).json(updateList);
    } else {
      const response = {
        status: "failure",
        message: "Couldn't delete IT Officer",
      };
      res.status(409).json(response);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
}

module.exports = { addItOfficers, fetchItOfficers, deleteItOfficer };
