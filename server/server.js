const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
// Load environment variables from .env file
dotenv.config();
connectDB();

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected successfully".green))
//   .catch((err) =>
//     console.error(`MongoDB connection error: ${err.message}`.red)
//   );

// Initialize Express app
const app = express();

// Apply middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use (cors ({
origin: ["http://localhost:3000"],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true,}
)) ;
app.use(morgan("dev")); // Log HTTP requests

// Define routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Set the port
const PORT = process.env.PORT || 5001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue
      .white
  );
});






// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const morgan = require("morgan");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// // Load environment variables from .env file
// dotenv.config();
// connectDB();

// // MongoDB connection
// // mongoose
// //   .connect(process.env.MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB connected successfully".green))
// //   .catch((err) =>
// //     console.error(`MongoDB connection error: ${err.message}`.red)
// //   );

// // Initialize Express app
// const app = express();

// // Apply middlewares
// app.use(express.json()); // Parse JSON bodies
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use (cors (
// origin: ["https://blood-bank-app-main.vercel.app"],
// methods: ["POST", "GE],
// credentials: true
// )) ;
// app.use(morgan("dev")); // Log HTTP requests

// // Define routes
// app.use("/api/v1/test", require("./routes/testRoutes"));
// app.use("/api/v1/auth", require("./routes/authRoutes"));
// app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
// app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
// app.use("/api/v1/admin", require("./routes/adminRoutes"));

// // Set the port
// const PORT = process.env.PORT || 5000;

// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//   console.log(
//     `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue
//       .white
//   );
// });
