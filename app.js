require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
var bcrypt = require("bcrypt");
var saltRounds = 1;


var app = express();

app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/LifterDB", {
  useNewUrlParser: true
});

const LifterSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Lifter = new mongoose.model("Lifter", LifterSchema);

app.get("/", function(req, res) {
  res.render("index")
});

app.get("/register", function(req, res) {
  res.render("register")
});

app.post("/register", function(req, res) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newLifter = new Lifter({
      email: req.body.email,
      password: hash
    });
    newLifter.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("myProfile")
      }
    });
  });
});

app.post("/", function(req, res, window) {
  const email = req.body.email;
  const password = req.body.password;

  Lifter.findOne({
    email: email
  }, function(err, foundLifter) {
    if (err) {
      console.log(err);
    } else {
      if (foundLifter) {
        bcrypt.compare(password, foundLifter.password, function(err, result) {
          if (result === true) {
            res.render("myProfile")
          } else {
            res.send("Incorrect Password")
          }
        })
      } else {
        res.send("User not found");
      }
    }
  })
});

app.get("/myProfile", function(req, res) {
  res.render("myProfile")
});



app.get("/matching", function(req, res) {
var girlNames = Array("Emily","Hannah","Madison","Ashley","Sarah","Alexis","Samantha","Jessica","Elizabeth","Taylor","Lauren","Alyssa","Kayla","Abigail","Brianna","Olivia","Emma","Megan","Grace","Victoria","Rachel","Anna","Sydney","Destiny","Morgan")
var randomGirlName = girlNames[Math.floor(Math.random()*girlNames.length)];
var randomAge = Math.floor(Math.random() * (40 - 18 + 1)) + 18;
var randomDistance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  res.render("matching", {
    randomGirlName: randomGirlName,
    randomAge: randomAge,
    randomDistance: randomDistance
  });
});

app.get("/tnc", function(req, res) {
  res.render("tnc")
});

app.get("/support", function(req, res) {
  res.render("support")
});

app.get("/forgotPassword", function(req, res) {
  res.render("forgotPassword")
});

app.get("/underConstruction", function(req, res) {
  res.render("underConstruction")
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
