// user.service.js
import knex from '../../comman/config/database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import accessTokenServie from '../access_token/access_token.service'
import refreshTokenService from '../refresh_token/refresh_token_service'
import jwt from 'jsonwebtoken'

dotenv.config()

class UserService {
  /** User registration
   *
   * @param {object} userData
   * @returns {object}
   */
  async register(userData) {
    const [id] = await knex('users').insert(userData)
    return await knex('users').where('id', id).first()
  }

  async findUserByEmail(email) {
    return await knex('users').where('email', email).first()
  }

  /**
   *
   * @param {String} password
   * @param {Object} userData
   * @returns
   */
  async comparePassword(password, userData) {
    return await bcrypt.compare(password, userData.password)
  }

  /**
   * generate Access Token and refresh token
   *
   * @param {string} userId
   * @param {string} email
   */
  async generateTokenPair(userId, email) {
    try {
      //generate access token
      const accessToken = await accessTokenServie.createToken(userId, email)
      // console.log('Access token----------->', accessToken)

      //decode data
      const decodeToken = jwt.decode(accessToken)
      // console.log('Decode token----------->', decodeToken)

      //generate referesh token
      const refreshToken = await refreshTokenService.createRefreshToken(
        decodeToken.jti,
        decodeToken.exp,
      )
      // console.log('Refresh Token --------->', refreshToken)

      //return
      return {
        accessToken,
        refreshToken,
        expiresAt: decodeToken.exp,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  /** user Login
   *
   * @param {String} password
   * @param {Object} userData
   * @param {Object} payload
   * @returns
   */

  async generateToken(userData) {
    try {
      // console.log('Password to compare:', password)
      // console.log('Stored password:', userData.password)

      //if matched generate token
      const token = await this.generateTokenPair(userData.id, userData.email)

      const decodeToken = await jwt.decode(token.accessToken)
      // console.log('Decoded token hellooooo-------->', decodeToken)

      const { accessToken, refreshToken } = token

      // console.log('Token ----> I got ---->', token)

      // also update token in database
      // update token in access_token table
      // const updateAccessToken = await knex('access_token')
      //   .where('user_id', userData.id)
      //   .update({ id: decodeToken.jti })

      //update refresh token
      // const updateRefreshToken = await knex('refresh_token')
      //   .where('accessTokenId', decodeToken.jti)
      //   .update({ id: refreshToken })

      //update Refresh_token

      return {
        token,
        decodeToken,
        accessToken,
        refreshToken,
        // updateAccessToken,
        // updateRefreshToken,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // async updateToken(token, userData) {
  //   return await knex('access_token')
  //     .where('user_id', userData.id)
  //     .update({ token: token })
  // }

 

   /**
   * Log Out User....
   * @param {string} id
   * @returns
   */
   async logOutUser(id) {
    // console.log('Token User Id is ::;------------>', id)
    return await knex('access_token').where('id', id).update({ revoked: true })
  };


/**
 * 
 * @param {String} id 
 * @returns 
 */
  async tokenValidity(id) {
    console.log('TOKEN REVOKATION-----------------------------------> ', id)
    return await knex('access_token')
      .where({ id: id })
      .orderBy('createdAt', 'desc')
      .first()
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  async isTokenvalid(sub) {
    return await knex('access_token').where('user_id', sub)
  }

  /***
   * 
   * @param {String} id
   */
  async findTokenid(id) {
    // console.log('findTokenID ========== id -----> ', id)
    return await knex('access_token')
      .where('user_id', id)
      .orderBy('createdAt', 'desc')
      .first()
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  async findById(id) {
    return await knex('users').where('id', id).first()
  }

  /**
   *
   * @returns Object
   */
  async getAllUsers() {
    return await knex('users').select('*')
  }

  async deleteUser(id) {
    // console.log('id---->', id)
    return await knex('users').where('id', id).del()
  }
  async isFileTypeSupported(fileType, supportedFileType) {
    return supportedFileType.includes(fileType)
  }

  /**
   *
   * @param {object} fileData
   * @returns
   */
  async storeFileData(fileData) {
    const [fileId] = await knex('profilePic').insert(fileData)
    return await knex('profilePic').where('id', fileId).first()
  }
}

export default new UserService()
