import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// import multer from "multer";
import path from "path";
// import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { app, server } from "./socket/socket.js";
//import UploadModel from "./models/upload.model.js";

dotenv.config(); //Crear variables de entorno

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.json({ limit: "10mb" })); // Es para tomar las respuestas del body req.body
app.use(cookieParser());
//Midlewares
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

//const upload = multer({ storage });

//Crear rutas principales
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Define APIs
// Define APIs
// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log(req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded!" });
//     }

//     const newFile = new UploadModel({
//       name: req.file.originalname,
//       mimetype: req.file.mimetype,
//       path: req.file.path,
//     });

//     await newFile.save();

//     res.status(201).json({ message: "File uploaded successfully!" });
//   } catch (err) {
//     console.log("Upload Error", err);
//   }
// });

// app.get("/files", async (req, res) => {
//   const files = await UploadModel.find().lean().exec();
//   return res.status(200).send(files);
// });

server.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
