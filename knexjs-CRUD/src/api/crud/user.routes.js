import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { createUser, allStudents, getSingleStudent, updateUser, deleteUser } from "./user.controller";
import validator from "../../comman/config/validator";
import userDtos from "./dtos/user.dtos";

const router = Router();

router.post(
  "/create-user",
  validator.body(userDtos),
  expressAsyncHandler(createUser)
);

router.get("/all-users", expressAsyncHandler(allStudents));

router.get(
  "/single-user/:id",
  expressAsyncHandler(getSingleStudent)
);

router.put(
    "/update-user/:id",
    validator.body(userDtos),
    expressAsyncHandler(updateUser)
);

router.delete(
    "/delete-user/:id",
    expressAsyncHandler(deleteUser)
)

export default router;
