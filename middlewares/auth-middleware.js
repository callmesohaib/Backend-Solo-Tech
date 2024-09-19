const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isverified = jwt.verify(jwtToken, process.env.JWT_SELECT_KEY);
    const userData = await User.findOne({ email: isverified.email }).select({
      password: 0,
    });
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};

module.exports = authmiddleware;
