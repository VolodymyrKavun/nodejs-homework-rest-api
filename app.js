const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

// повний шлях до файлу
const tempDir = path.join(__dirname, "temp");

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

const usersRouter = require("./routes/api/users");

const contactsRouter = require("./routes/api/contacts");

const app = express(); // веб сервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

// upload.fields([{name: "avatar", maxCount: 1}, {name: "subavatar", maxCount: 2}]) - передача в кількох полях файл
// upload.array("avatar", 8) - кілька файлів в одному полі
app.use("/api/contacts", upload.single("avatar"), contactsRouter); // передача тільки одного файлу

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
