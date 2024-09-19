require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("../routes/auth-router");
const serviceRouter = require("../routes/service-router");
const contactRouter = require("../routes/contact-router");
const adminRouter = require("../routes/admin-router");
const connect = require("../utils/db");
const errorMiddleware = require("../middlewares/error-middleware");

const Corsoptions = {
  origin: "https://frontend-solo-tech.vercel.app", // Remove the trailing slash and ensure it's correct
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add any additional headers you need
};


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-solo-tech.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Preflight response for OPTIONS requests
  }
  next();
});


app.use(cors(Corsoptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorMiddleware);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);

const port = 3000;

connect()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error While adding database");
  });
