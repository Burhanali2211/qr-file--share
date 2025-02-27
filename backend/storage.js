const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const crypto = require("crypto");
const path = require("path");

// ✅ Replace this with your MongoDB database name
const mongoURI = "mongodb://localhost:27017/qrdatabase";

// ✅ Create Storage Engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        
        const filename = buf.toString("hex") + path.extname(file.originalname);
        resolve({
          filename: filename,
          bucketName: "uploads", // ✅ Collection name in MongoDB
        });
      });
    });
  },
});

module.exports = storage;
