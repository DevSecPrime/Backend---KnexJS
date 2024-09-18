import joi from "joi";

export default joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name can`t be empty...",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required....",
    "string.email": "Inavalid Email....",
  }),
  password: joi.string().required().messages({
    "string.empty": "Password is required....",
  }),
  phone: joi.string().required().messages({
    "string.empty": "Phone numbeer is required...",
  }),
  account_type: joi.string().required().messages({
    "string.empty": "Account type is required...",
  }),
});
