const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();
connectDB();

const app = express();

// ✅ 1. Use JSON parser first
app.use(express.json());

// ✅ 2. CORS Configuration
const allowedOrigins = [
  "https://blood-bank-app-main-frontend.onrender.com",
  "http://localhost:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ handle preflight

// ✅ 3. Logger
app.use(morgan("dev"));

// ✅ 4. Your Routes
app.get("/", (req, res) => res.send("Backend is running!"));
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// ✅ 5. 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ 6. CORS Error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS Error: Origin not allowed" });
  }
  next(err);
});

// ✅ 7. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//   origin: "https://blood-bank-app-main-frontend.onrender.com",
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.send("✅ Backend is UP and CORS is working!");
// });

// app.listen(process.env.PORT || 8080, () => {
//   console.log("✅ Server started");
// });
