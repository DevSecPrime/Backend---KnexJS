"use strict";

var express = require("express"); //create express instance

var validator = require("../../comman/config/validator"); //import express validator

var registerDtos = require("./dtos/user.register.dtos"); //import dtos for registration

var registerController = require("./register.controller"); //import register controllerf

var expressAsyncHandler = require("express-async-handler"); //import expressAsyncHandler

var router = express.Router(); ///crete router

//import middleware
var _require = require("../../comman/middleware/auth"),
  auth = _require.auth;

//define the routes
router.post("/register", validator.body(registerDtos), expressAsyncHandler(registerController.registerUser));
router.post("/login", expressAsyncHandler(registerController.login));
router.get("/getProfile", auth, expressAsyncHandler(registerController.profile));

///export router
module.exports = router;