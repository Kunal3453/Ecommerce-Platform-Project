import express from "express";
import { UserControllers } from "../controller/user.controller";

const router = express.Router();

router.post("/signup", UserControllers.signup);
router.post("/forgot-password",UserControllers.forgotPassword)
router.post("/login",UserControllers.login)
router.post("/order",UserControllers.order);

export default router;
