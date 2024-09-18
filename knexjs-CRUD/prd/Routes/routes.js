"use strict";

var express = require("express");
var router = express.Router();
var userRoutes = require("../api/crud/user.routes");
var authRoutes = require("../api/user/register.router");
router.use("/user", userRoutes).use("/auth", authRoutes);
module.exports = router;