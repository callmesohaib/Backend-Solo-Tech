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
const path = require("path");

const Corsoptions = {
  origin: ["http://localhost:5173"],
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
app.get('/', (req, res)=>{
    res.send('Hello');
});

app.use(express.static(path.resolve(__dirname, "../client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
});

const port = 5000;

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

module.exports = app;
