const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const gltfValidator = require('gltf-validator');

const router = express.Router();
const uploadDir = path.join(__dirname, "..", "..", "uploads");

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Create Multer instance
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    const gltfFiles = fs.readdirSync(uploadDir);
    res.json(gltfFiles);
});

router.get("/:gltf", (req, res) => {
    res.redirect(`/${ req.params.gltf }`);
});

router.post("/upload", upload.single('fileToUpload'), (req, res) => {
    const gltfContents = fs.readFileSync(req.file.path);
    gltfValidator.validateBytes(new Uint8Array(gltfContents))
        .then(() => {
            res.json({
                success: true,
                filename: req.file.filename
            });
        })
        .catch(() => {
            fs.unlinkSync(req.file.path);
            res.status(500).json({ parsingError: "GLTF file parsing error." });
        });
});

module.exports = router;
