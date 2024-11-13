import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file

//Midlewares
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
