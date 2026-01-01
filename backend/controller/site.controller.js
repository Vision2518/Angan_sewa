import db from "../config/db.connect.js";
//add inquiry
export const addInquiry = async (req, res) => {
  try {
    const { name, email, phone, address, description, branch_id } = req.body;
    if (!name || !phone || !address || !description || !branch_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [existing_branch] = await db.query(
      "SELECT * FROM branch WHERE branch_id=?",
      [branch_id]
    );
    if (existing_branch.length == 0) {
      return res.status(400).json({ message: "This branch does not exist" });
    }
    await db.query(
      "INSERT INTO inquiry (name,email,phone,address,description,branch_id) VALUES(?,?,?,?,?,?)",
      [name, email, phone, address, description, branch_id]
    );
    return res.status(200).json({ message: "Your inquiry is uploaded" });
  } catch (error) {
    console.log(error);
  }
};
//get inquiry
export const getInquiry = async (req, res) => {
  try {
    const [row] = await db.query(`SELECT
    i.inquiry_id,
    i.name,
    i.phone,
    i.email,
    i.address,
    i.description,
    b.branch_id,
    b.branch_name FROM inquiry i
    LEFT JOIN branch b ON i.branch_id=b.branch_id
    `);
    res
      .status(201)
      .json({ message: "Inquiry retrived sucessfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
//delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { inquiry_id } = req.params;
    const managerBranchId = req.user.branch_id;

    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry id required" });
    }
    const [inquiry] = await db.query(
      "SELECT * FROM inquiry WHERE inquiry_id=?",
      [inquiry_id]
    );

    if (inquiry.length === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    if (inquiry[0].branch_id !== managerBranchId) {
      return res
        .status(403)
        .json({ message: "You can delete only your branch inquiries" });
    }
    await db.query(
      "DELETE FROM inquiry WHERE inquiry_id=?",
      [inquiry_id]
    );

    return res.status(200).json({
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//add review
export const addReview = async (req, res) => {
  try {
    const { name, star, description, branch_id } = req.body;
    if (!name || !star || !description || !branch_id) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const [branchExists] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id=?",
      [branch_id]
    );
    if (branchExists.length === 0) {
      return res.status(404).json({ message: "Branch does not exist" });
    }
    await db.query(
      "INSERT INTO review(name,star,description,branch_id) VALUES (?,?,?,?)",
      [name, star, description, branch_id]
    );
    res.status(201).json({ message: "Review added sucesfully" });
  } catch (error) {
    console.log(error);
  }
};
//get Review
export const getReview = async (req, res) => {
  try {
    const [row] = await db.query(`SELECT 
           r.name,
           r.star,
           r.description,
           b.branch_id,
           b.branch_name
           FROM review r 
           LEFT JOIN branch b ON r.branch_id=b.branch_id
            `);
    res.status(201).json({ message: "Review Retrived sucessfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
//add trusted customer
export const addTrustedCustomer = async (req, res) => {
  try {
    const { name } = req.body;
    const tCustomerImg = req.file;
    if (!name || !tCustomerImg) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const tCustomerImgPath = tCustomerImg.filename;
    await db.query(
      "INSERT into trusted_customer (name,trusted_customer_image) VALUES (?,?)",
      [name, tCustomerImgPath]
    );
    res.status(200).json({ message: "Trusted customer added sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
//get trusted customer
export const getTrustedCustomer = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM trusted_customer");
    res
      .status(200)
      .json({ message: "Sucessfully retrieved trusted customer", data: rows });
  } catch (error) {
    console.log(error);
  }
};
//add gallery
export const addGallery = async (req, res) => {
  try {
    const { title, branch_id } = req.body;
    console.log(req.user.user_id);
    console.log(req.user);
    const images = req.files;
    if (!title || !branch_id) {
      return res
        .status(400)
        .json({ message: "Please Provide Title and Branch_id" });
    }
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }
    const [branch] = await db.query("SELECT * FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }
    const uploadedBy = req.user.user_id;
    const userRole = req.user.role;
    const userBranchId = req.user.branch_id;
    if (userRole === "branch_manager") {
      if (parseInt(branch_id) !== userBranchId) {
        return res.status(403).json({
          message:
            "Branch manager can upload gallery for their own branch only",
        });
      }
    }
    for (let img of images) {
      await db.query(
        `INSERT INTO gallery (title,image_path,branch_id,uploaded_by)
          VALUES(?,?,?,?) `,
        [title, img.path, branch_id, uploadedBy]
      );
    }
    return res
      .status(201)
      .json({ message: "Gallery images uploaded sucessfully" });
  } catch (error) {
    console.log("Galery upload error", error);
    res.status(500).json({ message: "Server error" });
  }
};
//get gallery on role based
export const getGallery = async (req, res) => {
  try {
    const { role, branch_id: userBranchId } = req.user;
    let query = `SELECT
        g.gallery_id,
        g.title,
        g.image_path,
        g.branch_id,
        b.branch_name,
        g.uploaded_by
        FROM gallery g
        LEFT JOIN branch b
        ON g.branch_id=b.branch_id
        `;
    const params = [];
    //branch manager restriction
    if (role === "branch_manager") {
      query += "WHERE g.branch_id=?";
      params.push(userBranchId);
    }
    query += "ORDER BY g.gallery_id DESC";
    const [rows] = await db.query(query, params);
    res.status(200).json({
      message: "Gallery fetched sucessfully",
      data: rows,
    });
  } catch (error) {
    console.log("Get gallery error", error);
    res.status(500).json({ message: "Server error" });
  }
};
//get all gallery
export const getAllGalery = async (req, res) => {
  try {
    const { province_id, district_id, branch_id } = req.query;
    let query = "";
    let params = [];
    if (province_id && !district_id && !branch_id) {
      query = "SELECT * FROM district WHERE district WHERE province_id=?";
      params = [province_id];
    } else if (province_id && district_id && !branch_id) {
      query = "SELECT * FROM branch WHERE district_id=?";
      params = [district_id];
    } else if (provine_id && district_id && branch_id) {
      query = `
SELECT g.gallery_id,g.title.=,g.title,g.image_path,b,branch_name 
FROM gallery g 
LEFT JOIN branch b ON g.branch_id=branch_id
WHERE g.branch_id=?
`;
      params = [branch_id];
    } else {
      query = "SELECT * FROM gallery";
    }
    const [results] = await db.query(query, params);
    res
      .status(200)
      .json({ message: "Gallery data fetched sucessfully", data: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
