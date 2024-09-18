import express from "express";

const router = express.Router();

import userRoute from "../api/user/user.routes";


router.use("/user", userRoute);

export default router;
