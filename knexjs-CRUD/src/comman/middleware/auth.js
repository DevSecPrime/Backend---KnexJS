import database from "../config/database";
// const { message } = require("../../api/crud/dtos/user.dtos").default;
import { verify } from "jsonwebtoken";

export async function auth(req, res, next) {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found....",
      });
    }
    try {
      const decode = verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:----->", decode);

      req.user = decode;
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid token....",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in verifying the token....",
      error: error.message,
    });
  }
}
