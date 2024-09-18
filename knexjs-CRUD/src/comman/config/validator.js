import { createValidator } from "express-joi-validation";

const validator = createValidator({
  passError: false,
});
export default validator;
