import { Router } from "express"; //create express instance

import validator from "../../comman/config/validator"; //import express validator

import registerDtos from "./dtos/user.register.dtos"; //import dtos for registration

import { registerUser, login, profile } from "./register.controller"; //import register controllerf

import expressAsyncHandler from "express-async-handler"; //import expressAsyncHandler

const router = Router(); ///crete router

//import middleware
import { auth } from "../../comman/middleware/auth";

//define the routes
router.post(
  "/register",
  validator.body(registerDtos),
  expressAsyncHandler(registerUser)
);

router.post("/login", expressAsyncHandler(login));

router.get(
  "/getProfile",
  auth,
  expressAsyncHandler(profile)
);

///export router
export default router;
