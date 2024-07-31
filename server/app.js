const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/cohorts.model");
const Student = require("./models/students.model");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.post("/api/cohorts", (req, res) => {
  const newCohort = Cohort.create({ ...req.body })
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => res.json(cohorts))
    .catch((err) => console.error(err));
});
app.get("/api/cohorts/:id", (req, res) => {
  Cohort.findById(req.params.id)
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});
app.put("/api/cohorts/:id", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body)
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});
app.delete("/api/cohorts/:id", (req, res) => {
  Cohort.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: "Cohort deleted successfully" }))
    .catch((err) => console.error(err));
});

app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => console.error(err));
});
app.post("/api/students", (req, res) => {
  const NewStundent = Student.create({ ...req.body })
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.get("/api/students/cohort/:id", (req, res) => {
  Cohort.findById(req.params.id)
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});
app.get("/api/students/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.put("/api/students/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.delete("/api/students/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Student deleted successfully" }))
    .catch((err) => console.error(err));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
