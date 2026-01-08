import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.connect.js";
export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const [user] = await db.query("SELECT *FROM users WHERE email=?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "user not found" });
    }
    const userData = user[0];
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        user_id: userData.user_id,
        email: userData.email,
        role: userData.role,
        branch_id: userData.branch_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login sucessfull",
      token,
      user: {
        user_id: userData.user_id,
        email: userData.email,
        role: userData.role,
        branch_id: userData.branch_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout sucessful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//add branch manager
export const addBranchManager = async (req, res) => {
  try {
    const { email, password, branch_id } = req.body;
    if (!email || !password || !branch_id) {
      return res
        .status(400)
        .json({ message: "Email,password and branch_id are required" });
    }
    const [branch] = await db.query("SELECT * FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length === 0) {
      return res.status(400).json({ message: "Branch not found" });
    }
    const [existingUser] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (email,password,role,branch_id) VALUES (?,?,?,?)",
      [email, hashedPassword, "branch_manager", branch_id]
    );
    res.status(201).json({ message: "Branch manager added sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getBranchManager = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT  email, role,branch_id FROM users WHERE role="branch_manager"`
    );
    return res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};
export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.status(401).json({ message: "Token expired or invalid" });
      }
      console.log(decoded);
      res.status(200).json({
        message: "Token is valid",
        user: decoded,
      });
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};