/**
 * file which containts all the controllers routes.
 */

var express = require("express");

const masterRoutes = require("./masters/project.routes.js");


var app = express();


app.use("/master", masterRoutes);

module.exports = app;
