const mongoose = require("mongoose");

// Cache connection for serverless
let cachedConnection = null;

const connectDB = async () => {
    try {
        // Load env only in development
        if (process.env.NODE_ENV !== "production") {
            require("dotenv").config();
        }

        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) throw new Error("MongoDB URI is not defined in environment variables");

        // Reuse connection if already connected (serverless optimization)
        if (cachedConnection) return cachedConnection;

        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        cachedConnection = conn;
        return conn;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        throw error; // Let serverless handler handle errors
    }
};

module.exports = connectDB;
