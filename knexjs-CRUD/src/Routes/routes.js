import { Router } from "express";
const router = Router();

import userRoutes from "../api/crud/user.routes";
import authRoutes from "../api/user/register.router";

router
    .use("/user", userRoutes)
    .use("/auth", authRoutes);

export default router;
