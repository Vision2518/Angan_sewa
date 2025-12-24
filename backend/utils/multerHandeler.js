import multer from "multer";
const Servicestorage = multer.diskStorage({
  destination: "uploads/servicesimg",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const staffstorage = multer.diskStorage({
  destination: "uploads/staff",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.orginalname);
  },
});
export const uploadstaff = multer({ storage: staffstorage });
export const serviceImgUpload = multer({ storage: Servicestorage });
