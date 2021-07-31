//jshint esversion: 6

// Requiring npm modules
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

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
  char_id: {
    type: Number,
    required: true,
  },
  name: String,
  birthday: String,
  occupation: Array,
  img: String,
  status: String,
  nickname: String,
  appearance: Array,
  portrayed: String,
  category: Array,
  better_call_saul_appearance: Array,
});

// Favourite character model
const FavCharacter = mongoose.model("FavCharacters", favouriteCharSchema);

const apiEndpoint = "https://www.breakingbadapi.com/api/";

// Home route for all the characters in Breaking Bad
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const userFavChar = _.startCase(req.body.favChar);

  FavCharacter.findOne({ name: userFavChar }, function (err, example) {
    if (err) console.log(err);
    if (example) {
      console.log("This has already been saved");
      res.render("alreadySaved");
    } else {
      // Using axios to get data from their api
      axios
        .get(apiEndpoint + "characters?name=" + userFavChar)

        .then(function (response) {
          // handle success
          const userFavcharInfo = response.data[0];
          const newChar = new FavCharacter({
            char_id: userFavcharInfo.char_id,
            name: userFavcharInfo.name,
            birthday: userFavcharInfo.birthday,
            occupation: userFavcharInfo.occupation,
            img: userFavcharInfo.img,
            status: userFavcharInfo.status,
            nickname: userFavcharInfo.nickname,
            appearance: userFavcharInfo.appearance,
            portrayed: userFavcharInfo.portrayed,
            category: userFavcharInfo.category,
            better_call_saul_appearance:
              userFavcharInfo.better_call_saul_appearance,
          });
          newChar.save();
          res.redirect("/success");
        })

        .catch(function (error) {
          // handle error
          console.log(error);
          res.redirect("/failure");
        });
    }
  });
});

app.get("/success", function (req, res) {
  res.render("success");
});
app.post("/success", function (req, res) {
  console.log(req.body);
});

app.get("/failure", function (req, res) {
  res.render("failure");
});

app.get("/storedChar", function (req, res) {
  FavCharacter.find(function (err, characters) {
    if (err) {
      console.log(err);
      res.render("failure");
    } else {
      res.send(characters);
    }
  });
});

// Setting sever to listen on port 3000
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
