import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadRoute = express.Router();

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const user_name = req.query.user_name || "anonymous";
    const date = new Date().toISOString().split("T")[0];
    cb(null, `${user_name}_${date}.png`);
  },
});

const upload = multer({ storage: storage });

uploadRoute.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

export default uploadRoute;
