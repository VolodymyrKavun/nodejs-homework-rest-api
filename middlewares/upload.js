const multer = require("multer");
const path = require("path");

// повний шлях до файлу
const tempDir = path.join(__dirname, "../", "temp");

// налаштування для зберігання файлів
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// мідлвара для завантаження файлів
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
