import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import moment from "moment";
import knex from "../../comman/config/database";
require("dotenv");

class AccessTokensService {
  /**
   * Generates access tokens
   * @param {number} userId
   * @param {string} email
   */
  async createToken(userId, email) {
    const jti = randomBytes(32).toString("hex");

    const jwtToken = jwt.sign(
      {
        sub: userId,
        jti,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );

    const decodedJwtToken = jwt.decode(jwtToken);

    // save the token in the database
    await this.store(jti, userId, decodedJwtToken);

    return jwtToken; // Ensure this returns the generated token
  }

  /**
   * Save token in db
   * @param {string} jti
   * @param {number} userId
   * @param {object} decodedJwtToken
   *
   */
  async store(jti, userId, decodedJwtToken) {
    await knex("access_token").insert({
      id: jti,
      user_id:userId,
      expiresAt: moment.unix(decodedJwtToken.exp).format("YYYY-MM-DD"),
    });
  }

  
}

export default new AccessTokensService();
