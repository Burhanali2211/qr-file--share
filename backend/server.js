require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/qrdatabase";

const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log("✅ MongoDB GridFS is Ready");
});

// GridFS Storage Engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads'
        };
    }
});
const upload = multer({ storage });

// 🟢 Upload File API
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(201).json({ file: req.file });
});

// 🔍 Get All Files API
app.get('/files', async (req, res) => {
    try {
        const files = await gfs.files.find().toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files found' });
        }
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

// 📂 Get a Single File API (For Download)
app.get('/file/:id', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!file) return res.status(404).json({ message: 'File not found' });

        const readStream = gfs.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving file' });
    }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
