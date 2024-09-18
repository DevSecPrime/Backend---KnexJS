
import GeneralError from "./general-error";
import { HTTP_STATUS_CODE } from "../constants/constants";
class BadRequestException extends GeneralError {
  
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_STATUS_CODE.BAD_REQUEST||400;
  }

}

export default BadRequestException;
