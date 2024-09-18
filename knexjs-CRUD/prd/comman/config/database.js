"use strict";

//import knex instance
var knex = require('knex');
var knexFile = require("../../../knexfile");

//Import environment variables\
require("dotenv").config();
var environment = process.env.NODE_ENV || "development";
var dbConnect = knex(knexFile[environment]);
module.exports = dbConnect;