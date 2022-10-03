const mongoose = require("mongoose");
const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const { DB_HOST } = require("./config");

// const DB_HOST =
//   "mongodb+srv://Volodymyr:e08PVulLZuMuUNd5@cluster0.a1uqqq8.mongodb.net/db-contacts?retryWrites=true&w=majority";

// Підключення до бази даних
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

// e08PVulLZuMuUNd5 Код для логіну
// Volodymyr (Login)
