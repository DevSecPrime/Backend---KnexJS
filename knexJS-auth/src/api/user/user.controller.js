// userController.js
import userService from './user.service'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import fs from 'fs'
import UserResource from '../../resources/user.resources'
import BadRequestException from '../../comman/exceptions/bad-request.exception'
import { HTTP_STATUS_CODE } from '../../comman/constants/constants'
import NotFoundException from '../../comman/exceptions/not-found.exception'
import UnauthorizedException from '../../comman/exceptions/unauthorized.exception'

// import GeneralError from '../../comman/exceptions/general-error'
class UserController {
  /**
   *  sign up
   * @param {object} req
   * @param {object} res
   * @returns
   */

  async register(req, res, next) {
    try {
      const { name, email, password, phone, account_type } = req.body

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email)

      // In register method, error is thrown
      if (existingUser) {
        // console.error('User already exists, throwing exception...')
        throw new BadRequestException('User already exists....')
      }

      const hashPassword = await bcrypt.hash(password, 12)

      const newUser = await userService.register({
        name,
        email,
        password: hashPassword,
        phone,
        account_type,
      })

      const token = await userService.generateTokenPair(
        newUser.id,
        newUser.email,
      )
      const { accessToken, refreshToken } = token

      return res.status(HTTP_STATUS_CODE.OK).json({
        data: {
          ...new UserResource(newUser),
          accessToken,
          refreshToken,
        },
        message: 'User created successfully....',
      })
    } catch (error) {
      next(error) // Make sure to pass error to next middleware
    }
  }

  /** login
   *
   * @param {*} req
   * @param {*} res
   * @param {string} email
   * @param {string} password
   * @returns
   */
  async login(req, res, next) {
    try {
      //get data form req.user
      const { email, password } = req.body

      //check if user already exist or not
      const user = await userService.findUserByEmail(email)
      if (!user) {
        throw new NotFoundException('User doesn`t exist...')
      }
      //compare password
      const isPasswordMatched = await userService.comparePassword(
        password,
        user,
      )
      if (!isPasswordMatched) {
        throw new BadRequestException('Invalid Password....')
      }

      //if password matched genrate token
      const token = await userService.generateToken(user)
      const { accessToken, refreshToken } = token

      const options = {
        httpOnly: true,
      }

      //send response
      return res
        .status(HTTP_STATUS_CODE.SUCCESS)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
          message: 'User logged in successfully...',
          data: {
            ...new UserResource(user),
            accessToken,
            refreshToken,
          },
        })
    } catch (error) {
      next(error)
    }
  }

  /** profile
   *
   * @param {string} req token
   * @param {object} res
   * @returns
   */
  async profile(req, res, next) {
    try {
      //get data from req.user
      const id = req.user.sub
      // console.log('id------>', id)

      //check if user already exist or not
      if (!id) {
        throw new NotFoundException('User not found....')
      }
      //fetch user via id
      const user = await userService.findById(id)
      user.password = undefined //to hide th eassword form the response
      //send response
      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   *
   * @param {*} req
   * @param {Array,Object} res
   * @param {*} next
   * @returns
   */
  async getAllUser(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers()
      const resources = allUsers.map((user) => {
        return new UserResource(user)
      })

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        data: resources,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteAccount(req, res, next) {
    try {
      //get data from req.user
      const id = req.user.sub
      // console.log('id-------------------------------->', id)

      //check if user already exist or not
      if (!id) {
        throw new NotFoundException('User not found....')
      }
      //fetch user via id
      const user = await userService.findById(id)

      console.log('User', user)

      //delete user
      await userService.deleteUser(user.id)
      return res.status(200).json({
        message: 'User deleted successfully...',
      })
    } catch (error) {
      next(error)
    }
  }
  /**
   *  Log Out
   * @param {string} req token
   * @param {object} res
   * @returns
   */
  async logOut(req, res, next) {
    try {
      //fetch token req.user
      const id = req.user.sub
      console.log('User ID ------->', id)

      const user = await userService.findById(id)
      console.log('User is :----->', user)

      //validate user
      if (!user) {
        throw new NotFoundException('User not found....')
      }

      //get token id
      const getAccessTokenData = await userService.findTokenid(user.id)
      console.log('Access token Data ------->', getAccessTokenData)

      //check the token validity
      //check the token revokation value
      const isRevoked = await userService.tokenValidity(getAccessTokenData.id)
      // console.log('isRevoked', isRevoked)
      if (Boolean(isRevoked.revoked) === false) {
        console.log('Inside logout token.................')
        //Update token revokation value to 1 (Revoked)
        await userService.logOutUser(getAccessTokenData.id)
        console.log('User logged out ------->', getAccessTokenData.id)

        //send response
        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: 'User logged out successfully...',
        })
      } else {
        throw new UnauthorizedException(
          'Session Expired....Please log in again....',
        )
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * File Upload
   * @param {file} req
   * @param {object} res
   * @returns
   */
  async localFileUplaod(req, res,next) {
    try {
      //1. get data from user
      const { user_id } = req.body

      // console.log('user data --->', req.body)

      //2. get file data
      const file = req.files.file
      // console.log('file', file)

      if (!file) {
        return res.json({
          message: 'File is missing....',
        })
      }
      //3. create path to uplpad file
      const supportedFileType = ['jpg', 'png', 'jpeg', 'pdf', 'mp4'];
      const fileType = file.name.split('.')[1];

      // console.log('fileType---->', fileType)
      // console.log('file--->', file.mimetype)

      //4. check if file is supported or not
      if (!userService.isFileTypeSupported(fileType, supportedFileType)) {
        return res.json({
          message: 'File type is not supportyed...',
        })
      }
      //5. create  path to store file in database
      const fileName = `${Date.now()}-${file.name}`

      // console.log('File name--->', fileName)

      let uploadPath = path.join(__dirname, '../../../public/storage', fileName)

      //check if directory exist or not
      const isDirectoryExist = path.dirname(uploadPath)

      if (!fs.existsSync(isDirectoryExist)) {
        fs.mkdirSync(isDirectoryExist, { recursive: true })
      }

      // console.log('Upload path--->', uploadPath)
      

      //move file to uploded path

      file.mv(uploadPath, (error) => {
        if (error) {
          console.log('Error in uploading file', error)

          return res.json({
            message: 'Error in uploading file...',
            error: error.message,
          })
        } 
        // else {
        //   console.log('File moved successfully....')
        // }
      })

      //6. Store file-metadata in database
      const fileData = {
        name: fileName,
        user_id,
        fileType: file.mimetype,
        filePath: uploadPath.toString(),
      }

      await userService.storeFileData(fileData)

      //7. return response
      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: 'File uploaded successfully...',
        data: fileData,
      })
    } catch (error) {
      // console.log('Error in uploading file', error)
      next(error)
    }
  }
}

export default new UserController()
