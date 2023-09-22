const express = require("express");
const mongoose = require("mongoose");

const App = express();

const route = require("./routes/route.js");

App.use(express.static("public"));
App.use(
  express.urlencoded({
    extended: true,
  })
);
App.use(express.json());

App.set("view engine", "ejs");

const mongo_uri = "";
const PORT = process.env.PORT || 8500;

mongoose
  .connect(mongo_uri)
  .then((result) => {
    console.log("PORT 8500");
    App.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

App.use("", route);

App.use((req, res) => {
  res.status(404).send("404 not found");
});
