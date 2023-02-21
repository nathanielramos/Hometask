const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { model_validator } = require("../../utils/validator");

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
    const { path, filename } = req.file;
    model_validator(path)
        .then(() => {
            res.json({
                success: true,
                filename: filename
            });
        })
        .catch((err) => {
            const extension = filename.split(".").pop().toUpperCase();
            fs.unlinkSync(path);
            res.status(500).json({ parsingError: "Model file parsing error.", extension });
        });
});

module.exports = router;
