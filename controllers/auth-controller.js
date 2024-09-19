const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = (req, res) => {
  try {
    res.status(200).send("Welcome to the Home Page!");
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Registration Logic                             */
/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    /* ------------------------------ HashPassword ------------------------------ */

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      // password: hash_password,
      password,
    });

    if (!userCreated) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    res.status(201).json({
      message: "User created successfully",
      user: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Login Logic                                */
/* -------------------------------------------------------------------------- */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await userExists.comparePassword(password);

    if (isMatch) {
      res.status(200).json({
        message: "Login successfully",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    // res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

/* ----------------------------- User Data Logic ---------------------------- */

const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).send({  userData });
  } catch (error) {
    console.log("Error from Root");
  }
};

module.exports = { home, register, login, user };
