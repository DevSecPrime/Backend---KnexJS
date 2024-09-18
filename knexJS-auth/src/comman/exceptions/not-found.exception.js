import { HTTP_STATUS_CODE } from '../constants/constants'
import GeneralError from './general-error'

class NotFoundException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = HTTP_STATUS_CODE.NOT_FOUND || 404
  }
}

export default NotFoundException


