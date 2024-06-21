const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/baza-danych");

const User = require("./app/models/Users");

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

/* wyświetlanie użytkownika przez id */
app.get("/mongoose", function (req, res) {
  User.findById("6672d3ded7a53c9ab71134c8")
    .then((user) => {
      res.render("home", {
        name: user.name,
        address: user.address,
        website: user.website,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

/* wyświetlanie wszystkich użytkowników */
app.get("/mongoose", function (req, res) {
  User.find()
    .then((users) => {
      res.render("home", { users });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
