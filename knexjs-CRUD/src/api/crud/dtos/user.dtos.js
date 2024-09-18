import { object, string } from "joi";

const userSchema = object({
  name: string().required().messages({
    "string.empty": "Name is required...",
  }),
  email: string().required().messages({
    "string.empty": "Email is required...",
    "string.email": "Email must be a valid email...",
  }),
  phone: string().required().messages({
    "string.empty": "Phone Number is required...",
  }),
  description:string().allow(null,'')//to pass the optional field..
});

export default userSchema;
//To use this validation schema in your routes, you can import it and use it as middleware like this: