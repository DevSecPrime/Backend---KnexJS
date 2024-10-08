import { HTTP_STATUS_CODE } from "../constants/constants";

import GeneralError from "./general-error";

class ConflictRequestException extends GeneralError {
constructor(message){
    super();
    this.message = message;
    this.status = HTTP_STATUS_CODE.CONFLICT
}
};

export default ConflictRequestException;