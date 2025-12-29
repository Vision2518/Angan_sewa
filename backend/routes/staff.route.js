import express from "express";
import { addStaff, deleteStaff, getStaff } from "../controller/staff.controller.js";
import { uploadstaff } from "../utils/multerHandeler.js";
const staffRouter = express.Router();
staffRouter.post("/add-staff", addStaff);
staffRouter.get("/get-staff", getStaff);
staffRouter.delete("/delete-staff",deleteStaff);
export default staffRouter;
