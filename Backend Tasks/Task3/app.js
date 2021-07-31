//jshint esversion: 6

// Requiring npm modules
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Connection to mongoDB
mongoose.connect("mongodb://localhost:27017/favCharDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Favourite character Schema
const favouriteCharSchema = new mongoose.Schema({
  char_id: Number,
  name: String,
  birthday: String,
  occupation: Array,
  img: String,
  status: String,
  nickname: String,
  appearance: Array,
  portrayed: String,
  category: Array,
});

// Favourite character model
const FavCharacter = mongoose.model("FavCharacters", favouriteCharSchema);

const apiEndpoint = "https://www.breakingbadapi.com/api/";

// Home route for all the characters in Breaking Bad
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const userFavChar = req.body.favChar;

  // Using axios to get data from their api
  axios
    .get(apiEndpoint + "characters?name=" + userFavChar)

    .then(function (response) {
      // handle success
      console.log(response.data[0]);
    })

    .catch(function (error) {
      // handle error
      res.send("Error");
      console.log(error);
    });
});

// Setting sever to listen on port 3000
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
