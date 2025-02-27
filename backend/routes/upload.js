const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("../models/File"); // Import File model (create if not available)
const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filenames
    },
});

const upload = multer({ storage });

// ✅ Route to handle file upload
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const newFile = new File({
            filename: req.file.filename,
            filepath: req.file.path,
            uploadedAt: new Date(),
        });

        await newFile.save(); // Store file details in MongoDB
        res.status(201).json({ message: "File uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error uploading file", error });
    }
});

// ✅ Route to get uploaded files (for Admin)
router.get("/", async (req, res) => {
    try {
        const files = await File.find(); // Get all files from MongoDB
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching files", error });
    }
});

module.exports = router;
