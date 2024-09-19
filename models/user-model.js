const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  is_Admin: {
    type: "boolean",
    default: false,
  },
});

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

/* ------------------------------ Json WebToken ----------------------------- */

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        is_Admin: this.is_Admin,
      },
      process.env.JWT_SELECT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    next(error);
    // console.error(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    next(error);
    // console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
