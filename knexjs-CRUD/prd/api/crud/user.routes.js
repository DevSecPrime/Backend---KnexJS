"use strict";

var express = require("express");
var expressAsyncHandler = require("express-async-handler");
var userController = require("./user.controller");
var validator = require("../../comman/config/validator");
var userDtos = require("./dtos/user.dtos");
var router = express.Router();
router.post("/create-user", validator.body(userDtos), expressAsyncHandler(userController.createUser));
router.get("/all-users", expressAsyncHandler(userController.allStudents));
router.get("/single-user/:id", expressAsyncHandler(userController.getSingleStudent));
router.put("/update-user/:id", validator.body(userDtos), expressAsyncHandler(userController.updateUser));
router["delete"]("/delete-user/:id", expressAsyncHandler(userController.deleteUser));
module.exports = router;