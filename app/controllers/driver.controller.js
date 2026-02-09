const db = require("../models");
const Driver = db.driver; 

// 1. Get all drivers
exports.findAll = async (req, res) => {
  try {
    console.log("Fetching drivers list from database...");
    const data = await Driver.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving drivers." });
  }
};

// 2. Create a new driver
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Driver name cannot be empty!" });
    }

    const driver = new Driver({
      name: req.body.name,
      team: req.body.team,
      country: req.body.country
    });

    const data = await driver.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the Driver." });
  }
};

// 3. Get single driver by ID
exports.findOne = async (req, res) => {
  try {
    const data = await Driver.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Driver not found with id " + req.params.id });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Driver with id=" + req.params.id });
  }
};

// 4. Update driver data
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const data = await Driver.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true });
    
    if (!data) {
      return res.status(404).send({ message: `Cannot update Driver with id=${req.params.id}. Maybe Driver was not found!` });
    }
    res.send({ message: "Driver was updated successfully.", data });
  } catch (err) {
    res.status(500).send({ message: "Error updating Driver with id=" + req.params.id });
  }
};

// 5. Delete a driver
exports.delete = async (req, res) => {
  try {
    const data = await Driver.findByIdAndDelete(req.params.id);
    
    if (!data) {
      return res.status(404).send({ message: `Cannot delete Driver with id=${req.params.id}. Maybe Driver was not found!` });
    }
    res.send({ message: "Driver was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Driver with id=" + req.params.id });
  }
};