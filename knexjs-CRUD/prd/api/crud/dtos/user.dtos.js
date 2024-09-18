"use strict";

var joi = require("joi");
var userSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name is required..."
  }),
  email: joi.string().required().messages({
    "string.empty": "Email is required...",
    "string.email": "Email must be a valid email..."
  }),
  phone: joi.string().required().messages({
    "string.empty": "Phone Number is required..."
  }),
  description: joi.string().allow(null, '') //to pass the optional field..
});
module.exports = userSchema;
//To use this validation schema in your routes, you can import it and use it as middleware like this: