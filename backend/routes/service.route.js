import express from "express";
import {
  addService,
  deleteService,
  getAllservices,
} from "../controller/service.controller.js";
import { serviceImgUpload } from "../utils/multerhandeler.js";
const serviceRouter = express.Router();
serviceRouter.post("/add-service", serviceImgUpload.single("img"), addService);
serviceRouter.get("/get-service", getAllservices);
serviceRouter.delete("/delete-service/:service_id", deleteService);
export default serviceRouter;
