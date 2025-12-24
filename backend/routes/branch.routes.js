import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  getAllBranches,
  getAllDistricts,
  getAllProvinces,
} from "../controller/branch.controller.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
import { isLogin } from "../middlewares/isLogin.js";
const branchRouter = express.Router();
branchRouter.post(
  "/add-province",
  isLogin,
  authorizeRoles("admin"),
  addProvince
);
branchRouter.get("/get-province", getAllProvinces);
branchRouter.post("/add-district", addDistrict);
branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getAllBranches);
export default branchRouter;
