"use strict";

var _require = require("express-joi-validation"),
  createValidator = _require.createValidator;
var validator = createValidator({
  passError: false
});
module.exports = validator;