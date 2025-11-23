const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/dbConfig");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Tell Express where to look for EJS templates
app.set("views", path.join(__dirname, "../pages"));
app.set("view engine", "ejs");

// Static files
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/vendor", express.static(path.join(__dirname, "../public/vendor")));

// Routes
app.use("/api/auth", require("../routes/authRoute"));
app.use("/", require("../routes/pagesRoutes"));
app.use("/api/events", require("../routes/eventRoutes"));
app.use("/api/payment", require("../routes/paymentRoutes"));
app.use("/api/ticket", require("../routes/ticketRoutes"));

// Home route
const checkAuth = require("../middlewares/checkAuth");
app.get("/", (req, res) => {
    res.render("index", { user: req.user });
});

// Connect to MongoDB BEFORE handling requests
// let isDBConnected = false;
// const handler = async (req, res, next) => {
//     if (!isDBConnected) {
//         try {
//             await connectDB();
//             isDBConnected = true;
//         } catch (err) {
//             return res.status(500).send("Database connection error");
//         }
//     }
//     next();
// };
// app.use(handler);

module.exports = serverless(app);
