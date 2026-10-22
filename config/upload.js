const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeExtension = /^\.[a-z0-9]{1,10}$/.test(extension) ? extension : "";
    callback(null, `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`);
  }
});

function fileFilter(_req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    const error = new Error("Unsupported file type. Upload a JPEG, PNG, WebP, or GIF image.");
    error.code = "UNSUPPORTED_FILE_TYPE";
    return callback(error);
  }
  return callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});

module.exports = { upload, uploadDirectory };
