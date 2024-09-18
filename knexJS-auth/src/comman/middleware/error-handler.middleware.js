import { HTTP_STATUS_CODE } from '../constants/constants'
import GeneralError from '../exceptions/general-error'

export default (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res
      .status(err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({
        status: err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message,
      })
  }

  if (err && err.error && err.error.isJoi) {
    if (err.error.details[0]) {
      return res.status(HTTP_STATUS_CODE.UNPROCESSABLE).json({
        success: false,
        message: err.error.details[0].message,
      })
    }
  }

  if (err && err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  } else {
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR || 500,
      success: false,
      message: err && err.message ? err.message : 'Internal Server Error',
    })
  }
}
