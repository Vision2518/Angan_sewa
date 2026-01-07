import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getAllBranches,
  getAllDistricts,
  getAllPDB,
  getAllProvinces,
  updateBranch,
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
branchRouter.delete("/delete-province", deleteProvince);
branchRouter.post("/add-district", addDistrict);
branchRouter.get("/get-district", getAllDistricts);
branchRouter.delete("/delete-district", deleteDistrict);
branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getAllBranches);
branchRouter.get("/pdb", getAllPDB);
branchRouter.delete(
  "/delete-branch",
  isLogin,
  authorizeRoles("admin"),
  deleteBranch
);
branchRouter.patch(
  "/update-branch",
  isLogin,
  authorizeRoles("admin"),
  updateBranch
);
export default branchRouter;
