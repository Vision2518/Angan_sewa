import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  addTrustedCustomer,
  getInquiry,
  getReview,
  getTrustedCustomer,
} from "../controller/site.controller.js";
import { Galleries, tcustomerImgUpload } from "../utils/multerHandeler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
const siteRouter = express.Router();
siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/get-inquiry", getInquiry);
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.post(
  "/add-trusted-customer",
  tcustomerImgUpload.single("tcustomerImg"),
  addTrustedCustomer
);
siteRouter.get("/get-trusted-customer", getTrustedCustomer);
siteRouter.post(
  "/add-gallery",
  isLogin,
  authorizeRoles("admin","branch_manager"),
  Galleries.array("images", 20),
  addGallery
);
export default siteRouter;
