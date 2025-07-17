const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
// If you want colored logs, uncomment the next line and install 'colors' package
// require("colors");

dotenv.config();
connectDB();
const app = express();

// Apply middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));

// Define routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  // If using 'colors', use the next line, otherwise use the one after
  // console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue.white);
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`);
});