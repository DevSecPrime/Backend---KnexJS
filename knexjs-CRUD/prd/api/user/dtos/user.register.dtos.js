"use strict";

var joi = require("joi");
var registerUser = joi.object({
  name: joi.string().required().messages({
    "string.empty": "name is required...."
  }),
  email: joi.string().required().email().messages({
    "string.empty": "Email is required...",
    "string.email": "email must be valid email..."
  }),
  phone: joi.string().required().messages({
    "string.empty": "phonr number is required...."
  }),
  password: joi.string().required().messages({
    "string.empty": "passwor field can`t be empty...."
  })
});
module.exports = registerUser;