//create express and router instance
const express = require('express');
const router = express.Router();

//import user controller
const {createUser} = require("../controller/userControllers");

//define routes
router.post("/createUser", createUser);

//export router
module.exports = router;
