import express from "express";
import { addStaff, getStaff } from "../controller/staff.controller.js";
import { uploadstaff } from "../utils/multerHandeler.js";
const staffRouter = express.Router();
staffRouter.post("/add-staff", addStaff);
staffRouter.get("/get-staff", getStaff);

export default staffRouter;
