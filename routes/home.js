const express = require("express");
const route = express.Router();
const { authenticated } = require("../config/auth");

route.get("/", (req, res) => {
  res.render("index");
});

module.exports = route;
