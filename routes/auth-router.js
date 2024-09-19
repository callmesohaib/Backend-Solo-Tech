const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const {signupSchema,loginSchema} = require("../Validators/auth-validate");
const validatemiddleware = require("../middlewares/validate-middleware");
const authmiddleware = require("../middlewares/auth-middleware");

// const {home,register} =require("../controllers/auth-controller");

router.get("/", authcontrollers.home);
router.post(
  "/register",
  validatemiddleware(signupSchema),
  authcontrollers.register
);
router.post("/login", validatemiddleware(loginSchema), authcontrollers.login);

router.get("/user", authmiddleware, authcontrollers.user);

// router.get("/about", (req, res) => {
//   res.status(200).send("hello About Router");
// });

module.exports = router;
