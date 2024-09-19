const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(400).json({ message: "No service found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in Services");
  }
};

module.exports = services;
