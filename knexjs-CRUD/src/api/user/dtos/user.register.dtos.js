import { object, string } from "joi";

const registerUser = object({
  name: string().required().messages({
    "string.empty": "name is required....",
  }),
  email: string().required().email().messages({
    "string.empty": "Email is required...",
    "string.email": "email must be valid email...",
  }),
  phone: string().required().messages({
    "string.empty": "phonr number is required....",
  }),
  password: string().required().messages({
    "string.empty": "passwor field can`t be empty....",
  }),
});

export default registerUser;
