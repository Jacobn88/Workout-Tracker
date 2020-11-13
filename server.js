const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

// const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

app.post("/api/workouts", ({ body }, res) => {
  Exercise.create(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts", function (req, res) {
  res.send("hello world");
})

app.post("/api/workouts", function (req, res) {
  res.send(null);
})

app.get('/exercise', (req, res) => {
  res.sendFile("exercise.html", { root: path.join(__dirname, "public") });
});

app.get('/stats', (req, res) => {
  res.sendFile("stats.html", { root: path.join(__dirname, "public") });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
