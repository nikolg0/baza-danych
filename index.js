const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/baza-danych");

const User = require("./app/models/Users");

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

/* wyświetlanie wszystkich użytkowników */
app.get("/", function (req, res) {
  User.find()
    .lean()
    .then((users) => {
      console.log(users);
      res.render("home", { users });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
