const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("./db");
const cors = require("cors");
// const mongoose = require("mongoose");

const app = express();

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";
app.use(
  cors({
    FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const StudentRoutes = require("./routes/students.routes");
app.use("/api/students", StudentRoutes);

const CohortRoutes = require("./routes/cohorts.routes");
app.use("/api/cohorts", CohortRoutes);

module.exports = app;
