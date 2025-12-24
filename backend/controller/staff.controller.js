import db from "../config/db.connect.js";
import bcrypt from "bcryptjs";
//  export const addStaff = async (req, res, next) => {
//   try {
//     const { branch_id, name, email, phone, address, password, role } = req.body;
//     console.log(req.body);
//     console.log(req.file);
//     if (!branch_id || !name || !phone || !req.file) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }
//     const [branchExists] = await db.query(
//       "SELECT * FROM branches WHERE branch_id=?",
//       [branch_id]
//     );
//     if (branchExists.length === 0) {
//       return res.status(404).json({ message: "Branch does not exists" });
//     }
//     const [existingUser] = await db.query("SELECT * FROM staff WHERE email=?", [
//       email,
//     ]);
//     if (existingUser.length > 0) {
//       return res.status(409).json({ message: "Email already exists" });
//     }
//     const imagePath = `uploads/${req.file.filename}`;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await db.query(
//       "INSERT INTO staff (branch_id,name,email,phone,address,password,role,staff_image) VALUES (?,?,?,?,?,?,?,?)",
//       [branch_id, name, email, phone, address, hashedPassword, role, imagePath]
//     );
//     res
//       .status(201)
//       .json({ message: "Staff added sucessfully", staff_id: result.insertId });
//   } catch (error) {
//     next(error);
//   }
// };
export const addStaff = async (req, res) => {
  try {
    const { name, email, phone, address, password, branch_id } = req.body;
    if (!name || !email || !phone || !address || !password || !branch_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const [branch] = await db.query("SELECT * FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length === 0) {
      return res.status(400).json({ error: "Branch does not found" });
    }
    const [existingStaff] = await db.query("SELECT *FROM staff WHERE email=?", [
      email,
    ]);
    if (existingStaff.length > 0) {
      return res.status(400).json({ message: "Staff already exists" });
    }
    await db.query(
      "INSERT INTO staff(name,email,phone,address,password,branch_id) VALUES (?,?,?,?,?,?)",
      [name, email, phone, address, password, branch_id]
    );
    return res.status(201).json({ message: "Staff added sucessfully" });
  } catch (error) {
    console.log(error);
  }
};
//get staff
export const getStaff = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT *FROM staff");
    return res.status(200).json({ message: "retrieved all data ", data: rows });
  } catch (error) {
    console.log(error);
  }
};
