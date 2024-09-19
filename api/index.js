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
  origin: ["https://frontend-solo-tech.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

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
