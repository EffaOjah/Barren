const serverless = require("serverless-http");
const express = require("express");
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/dbConfig");

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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

// Home
const checkAuth = require("../middlewares/checkAuth");

app.get("/", checkAuth, (req, res) => {
    res.render(path.join(__dirname, "../pages/index"), { user: req.user });
});

module.exports = serverless(app);