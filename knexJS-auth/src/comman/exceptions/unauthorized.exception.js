import { HTTP_STATUS_CODE } from '../constants/constants'
import GeneralError from './general-error'

class UnauthorizedException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = HTTP_STATUS_CODE.UNAUTHORIZED
  }
}

export default UnauthorizedException
