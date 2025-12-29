import express from "express";
import db from "../config/db.connect.js";
//add province
export const addProvince = async (req, res) => {
  try {
    const { province_name } = req.body;
    const [existingProvince] = await db.query(
      "SELECT * FROM province WHERE province_name=?",
      [province_name]
    );
    if (existingProvince.length > 0) {
      return res.status(400).json({ message: "Province already exists" });
    }
    await db.query("INSERT INTO province (province_name) VALUES (?)", [
      province_name,
    ]);
    res.status(201).json({ message: "Province added sucessfully" });
  } catch (error) {
    console.log(error);
  }
};
//get all provinces
export const getAllProvinces = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
      p.province_id,
      p.province_name,
      GROUP_CONCAT(d.district_name) as district
      FROM province p
      LEFT JOIN district d
      ON p.province_id=d.province_id
      GROUP BY p.province_id,p.province_name
      `);
    res.status(200).json({
      message: "Sucesssfully retrieved all provinces",
      data: rows,
    });
  } catch (error) {
    console.error("Failed to get all data", error);
  }
};
//delete province
export const deleteProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute(
      "SELECT * FROM province WHERE province_id=? ",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        message: `province not found with this ${id}th id`,
      });
    }
    const existProvince = existing[0];
    await db.execute("DELETE FROM province WHERE province_id=?", [province_id]);
    res.status(200).json({
      message: `${existProvince.province_name} province deleted sucessfully`,
    });
  } catch (error) {
    next(error);
  }
};
//add district
export const addDistrict = async (req, res) => {
  try {
    const { district_name, province_id } = req.body;
    const [existingProvince] = await db.query(
      "SELECT * FROM province WHERE province_id = ?",
      [province_id]
    );
    if (existingProvince.length === 0) {
      return res.status(400).json({ message: "Province does not exist" });
    }
    const [existingDistrict] = await db.query(
      "SELECT * FROM district WHERE district_name = ?",
      [district_name]
    );
    if (existingDistrict.length > 0) {
      return res.status(400).json({ message: "District already exists" });
    }
    await db.query(
      "INSERT INTO district (district_name,province_id) VALUES (?,?)",
      [district_name, province_id]
    );
    res.status(201).json({ message: "District added successfully" });
  } catch (error) {
    console.log("error", error);
  }
};
//get all districts
export const getAllDistricts = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM district`);
    res.status(200).json({
      message: "Sucesssfully retrieved all districts",
      data: rows,
    });
  } catch (error) {
    console.error("Failed to get all data", error);
  }
};
//delete district
export const deleteDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "SELECT district_id from district WHERE district_id=?",
      [id]
    );
    console.log();
    if (inputtedId == 0) {
      res.status(404).json({ message: "District doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM district WHERE district_id=?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "District not found" });
    }
    res
      .status(200)
      .json({ message: "District with id ${id} deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};

//add branch
export const addBranch = async (req, res) => {
  try {
    const { branch_name, remarks, district_id } = req.body;
    const [existingDistrict] = await db.query(
      "SELECT * FROM district WHERE district_id=?",
      [district_id]
    );
    if (existingDistrict.length === 0) {
      return res.status(400).json({ message: "District does not exist" });
    }
    await db.query(
      "INSERT INTO branch (branch_name,remarks,district_id) VALUES (?,?,?)",
      [branch_name, remarks, district_id]
    );
    res.status(201).json({ message: "Branch added sucessfully" });
  } catch (error) {
    console.log("error", error);
  }
};
//get all branch
export const getAllBranches = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT d.district_name,b.branch_name,b.remarks FROM branch b LEFT JOIN district d ON b.branch_id=d.district_id"
    );
    res.status(200).json({
      message: "sucessfully retrieved all branch name",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//delete branch
export const deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id=?",
      [id]
    );
    if (inputtedId == 0) {
      res.status(404).json({ message: "branch doesnot exists" });
    }
    const [result] = await db.query("DELETE FROM branch WHERE branch_id=?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Branch not found" });
    }
    res
      .status(200)
      .json({ message: "Branches deleted sucessfully with id ${id}" });
  } catch (error) {
    next(error);
  }
};
//update branch
export const updateBranch=async(req,res,next)=>{
  try {
    const {id}=req.params;
    const {branch_name,district_id,remarks}=req.body;
    const [existing]=await db.query("SELECT * FROM branch WHERE branch_id=?",
      [id]
    );
    if(existing.length===0)
    {
      return res.status(404).json({
        message:"Branch not found with id ${id}",
      });
    }
    const oldbranch=existing[0];
    const updatedBranchName=branch_name||oldbranch.branch_name;
    const updatedDistrictId=district_id||oldbranch.district_id;
    const updatedRemarks=remarks||oldbranch.remarks;
    if(district_id !==oldbranch.district_id){
      
    }
  } catch (error) {
    
  }
}