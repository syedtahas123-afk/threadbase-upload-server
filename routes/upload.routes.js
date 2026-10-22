const express = require("express");
const multer = require("multer");
const { upload } = require("../config/upload");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/upload", verifyToken, (req, res) => {
  upload.single("avatar")(req, res, (error) => {
    if (error) {
      if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File exceeds the 5 MB limit" });
      }
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message || "Upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Missing file. Send multipart/form-data field "avatar".' });
    }

    return res.status(201).json({
      message: "Avatar uploaded successfully",
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`
    });
  });
});

module.exports = router;
