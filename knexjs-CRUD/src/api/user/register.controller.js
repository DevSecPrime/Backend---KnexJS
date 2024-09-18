// const { message } = require("./dtos/user.register.dtos").default;
import { checkExistingUserByEmail, createUser, getUserById } from "./register.service";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
require("dotenv").config();
import database from "../../comman/config/database";
import { options } from "joi";

export async function registerUser(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    // Check that all fields are provided
    //this is alll handled by joi validator

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required....",
      });
    }

    // Check if the user already exists
    const existingUser = await checkExistingUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash the password
    let hashPassword;
    try {
      hashPassword = await hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create a new user in the database
    const newUser = await createUser({
      name,
      email,
      phone,
      password: hashPassword,
    });

    // Generate JWT token
    const payload = { id: newUser.id };
    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.SECRET_EXPIRATION_TIME,
    });

    // Store the token in the database
    await database("access_token").insert({
      token_id: newUser.id,
      token: token,
    });

    // Send a response back to the client
    const options = {
      httpOnly: true,
    };
    return res.status(201).cookie("token", token, options).json({
      success: true,
      message: "User created successfully...",
      data: newUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong...",
    });
  }
}
export async function login(req, res) {
  try {
    //get user data from req.body
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required...",
      });
    }
    //check if user exist or not
    const user = await checkExistingUserByEmail(email);
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist...please register first",
      });
    }
    //compare password
    const payload = {
      id: user.id,
    };
    if (await compare(password, user.password)) {
      //generate token

      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.SECRET_EXPIRATION_TIME,
      });

      user.password = undefined;

      //store token in database

      //change exisiting token with updarted token
      const exisitingToken = await database("access_token")
        .where("token_id", user.id)
        .first();

      //if therer is existing token update with it
      if (exisitingToken) {
        //update token with updated data
        await database("access_token")
          .where("token_id", user.id)
          .update({ token });
      } else {
        //insert new token in databse
        await database("access_token").insert({
          token_id: user.id,
          token: token,
        });
      }

      //   console.log("Stored token", storeToken);

      //send response
      return res.status(200).cookie("token", token, options).json({
        success: true,
        message: "Login successful",
        token: token,
        data: user,
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }
    //generate token
    //send response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: "Something went wrong...",
    });
  }
}

export async function profile(req, res) {
  try {
    const id = req.user.id;
    const userProfile = await getUserById(id);

    if (!userProfile) {
      return res.status(401).json({
        success: false,
        message: "Error while fetching profile....",
      });
    }

    userProfile.password = undefined;
    // userProfile.createdAt = undefined;
    
    userProfile.updatedAt = undefined;

    return res.status(200).json({
      success: true,
      message: "Profile fetched succesfully...",
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching the profile....",
      error: error.message,
    });
  }
}
