import express from "express";
import {
  addService,
  deleteService,
  getAllservices,
} from "../controller/service.controller.js";
import { serviceImgUpload } from "../utils/multerhandeler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
const serviceRouter = express.Router();
serviceRouter.post(
  "/add-service",
  serviceImgUpload.single("img"),
  isLogin,
  authorizeRoles("branch_manager"),
  addService
);
serviceRouter.get("/get-service", getAllservices);
serviceRouter.delete(
  "/delete-service/:service_id",
  isLogin,
  authorizeRoles("branch_manager"),
  deleteService
);
serviceRouter.patch(
  "/update-service/:service_id",
  serviceImgUpload.single("img"),
  isLogin,
  authorizeRoles("branch_manager"),
  deleteService
);

export default serviceRouter;
