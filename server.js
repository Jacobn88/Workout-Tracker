const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
var db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.get("/api/workouts",function(req,res){  
  db.Workout.find({})
  .then(data =>{res.json(data)})
  .catch(err => {res.json(err)})
});

app.get("/api/workouts/range",function(req,res){  
  db.Workout.find({})
  .then(data =>{res.json(data)})
  .catch(err => {res.json(err)})
});

app.post("/api/workouts",function(req,res){  
  db.Workout.create({})
  .then(data =>{res.json(data)})
  .catch(err => {res.json(err)})
});

app.post("/api/workouts/range",function(req,res){  
  db.Workout.create({})
  .then(data =>{res.json(data)})
  .catch(err => { res.json(err)})
});

app.put("/api/workouts/:id",function({body, params},res){  
  db.Workout.findByIdAndUpdate(
  {_id: params.id},{$set: {exercises:[body]}},{new:true})
  .then(data =>{res.json(data)})
  .catch(err => {res.json(err)})
});

app.get('/exercise', (req, res) => {
  res.sendFile("exercise.html", { root: path.join(__dirname, "public") });
});

app.get('/stats', (req, res) => {
  res.sendFile("stats.html", { root: path.join(__dirname, "public") });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
