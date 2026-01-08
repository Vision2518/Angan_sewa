import express from "express";
import {
  addBranchManager,
  authLogin,
  getBranchManager,
  signout,
  verifyToken,
} from "../controller/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
//import { sign } from "jsonwebtoken";
const authRouter = express.Router();
authRouter.post("/login", authLogin);
authRouter.post("/signout", signout);
authRouter.post(
  "/add-branch-manager",
  isLogin,
  authorizeRoles("admin"),
  addBranchManager
);
authRouter.get(
  "/get-branch-manager",
  isLogin,
  authorizeRoles("admin"),
  getBranchManager
);
authRouter.get("/verify-token",isLogin,verifyToken)
export default authRouter;
