const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const PORT = 9099;
const path = require("path");

const server = express();
server.use("/uploads", express.static(path.join(__dirname, "./uploads")));

server.use(express.json());

require("dotenv").config();

server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://capstone-project-rho-kohl.vercel.app/",
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

const animalRoute = require("./routes/animal.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");

// Rotte
server.use("/animals", animalRoute);
server.use("/users", userRoute);
server.use("/auth", authRoute);

server.use(errorHandler);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind("error during database connection"));
db.once("open", () => {
  console.log("Database Connected");
});

server.listen(PORT, () => {
  console.log(`Server running correctly on port ${PORT}`);
});
