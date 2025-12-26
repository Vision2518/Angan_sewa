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
import { tcustomerImgUpload } from "../utils/multerHandeler.js";
const siteRouter = express.Router();
siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/get-inquiry", getInquiry);
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.post(
  "add-trusted-customer",
  tcustomerImgUpload.single("tcustomerImg"),
  addTrustedCustomer
);
siteRouter.get("/get-trusted-customer", getTrustedCustomer);
siteRouter.post("/add-gallery", addGallery);
export default siteRouter;
