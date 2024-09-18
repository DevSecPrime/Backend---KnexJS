import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from '../../api/user/user.service'
import BadRequestException from '../exceptions/bad-request.exception'
import NotFoundException from '../exceptions/not-found.exception'
dotenv.config()

//generate token

export default async function auth(req, res, next) {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header('Authorization').replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Decoded token------------------------>', decoded)

      //check if token /user stil exist
      const isTokenvalid = await userService.isTokenvalid(decoded.sub);
      console.log("Token is valid.....");

      if (!isTokenvalid) {
        throw new BadRequestException('Invalid token....')
      }

      //paas token in decode to get user data
      req.user = decoded
      console.log(req.user)
    } else {
      throw new NotFoundException('Token is Missing....');
    }
    next()
  } catch (error) {
    next(error)
  }
}
