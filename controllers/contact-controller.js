const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    res.status(200).json({ message: "Message Send Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Message Not Deliver" });
  }
};

module.exports = contactForm;
