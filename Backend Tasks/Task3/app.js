//jshint esversion: 6

// Requiring npm modules
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

// Home route for all the characters in Breaking Bad
app.get("/", function (req, res) {
  // Using axios to get data from their api
  axios
    .get("https://www.breakingbadapi.com/api/characters")

    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send("Success");
    })

    .catch(function (error) {
      // handle error
      res.send("Error");
      console.log(error);
    });
});

// /betterCallSaul for all the character in Better Call Saul
app.get("/betterCallSaul", function (req, res) {
  // Using axios to get data from their api
  axios
    .get(
      "https://www.breakingbadapi.com/api/characters?category=Better+Call+Saul"
    )

    .then(function (response) {
      // handle success
      res.send("Success");
      console.log(response.data);
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
