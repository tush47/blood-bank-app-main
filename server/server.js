const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();
connectDB();
const app = express();

// Apply middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'https://blood-bank-app-main.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));

// Define routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Optional: catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // If using 'colors', use the next line, otherwise use the one after
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue.white);
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`);
});